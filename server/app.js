import express from "express";
import connectDB from "./utils/db.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { v4 as uuid } from "uuid";


import { Server } from "socket.io";

import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";
import { NEW_MESSAGE } from "./constants/event.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {});

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 5000;

 const adminSecretKey = process.env.ADMIN_SECRET_KEY || "anonadmin";
 const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const userSocketIDs = new Map();


connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(errorMiddleware);

io.on("connection", (socket) => {

  const user = {
    _id:"abcdefgh",
    name:"Anon"
  }

  userSocketIDs.set(user._id, socket.id);
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
})

  socket.on("disconnect", () => {
    console.log("Disconnected from socket.io");
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



export{userSocketIDs,adminSecretKey, envMode};