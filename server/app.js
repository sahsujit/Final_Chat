
import express from 'express';
import connectDB from './utils/db.js';
import dotenv from 'dotenv';
import { errorMiddleware } from './middlewares/error.js';
import cookieParser from 'cookie-parser';



import userRoute from './routes/user.js';
import chatRoute from './routes/chat.js';


const app = express();


dotenv.config({
    path:"./.env",
});

const port = process.env.PORT || 5000;



connectDB()




app.use(express.json());
app.use(cookieParser())


app.use("/user", userRoute)
app.use("/chat", chatRoute)







app.get('/', (req, res) => {
  res.send('Hello World!');
}



);


app.use(errorMiddleware)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}
);