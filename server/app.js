import express from "express";
import connectDB from "./utils/db.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { v4 as uuid } from "uuid";
import cors from "cors";

import { v2 as cloudinary } from "cloudinary";

import { Server } from "socket.io";

import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/event.js";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";
import { corsOptions } from "./constants/config.js";
import { socketAuthenticator } from "./middlewares/auth.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {cors:corsOptions});
app.set("io", io);

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 5000;

 const adminSecretKey = process.env.ADMIN_SECRET_KEY || "anonadmin";
 const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const userSocketIDs = new Map();


connectDB();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions))

app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(errorMiddleware);

io.use((socket, next)=>{
  cookieParser()(
    socket.request,
    socket.request.res,
    async(err)=>await socketAuthenticator(err, socket, next)
  )
})

io.on("connection", (socket) => {

  const user = socket.user

  userSocketIDs.set(user._id.toString(), socket.id);
  console.log("Connected to socket.io", socket.id);

socket.on(NEW_MESSAGE, async({message, chatId, members})=>{

  const messageForRealTime = {
    content:message,
     _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
  }

  const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };

    const membersSocket = getSockets(members);
    io.to(membersSocket).emit(NEW_MESSAGE,{
      chatId,
      message: messageForRealTime
    })

    io.to(membersSocket).emit(NEW_MESSAGE_ALERT,{
      chatId
    })

    try {
     await Message.create(messageForDB);
    } catch (error) {
      throw new Error(error)
    }
})

  socket.on("disconnect", () => {
    console.log("Disconnected from socket.io");
  userSocketIDs.delete(user._id.toString());
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



export{userSocketIDs,adminSecretKey, envMode};