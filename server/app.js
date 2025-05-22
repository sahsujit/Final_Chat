
import express from 'express';
import userRoute from './routes/user.js';
import connectDB from './utils/db.js';
import dotenv from 'dotenv';

const app = express();


dotenv.config({
    path:"./.env",
});

const port = process.env.PORT || 5000;



connectDB()


app.use(express.json());
app.use("/user", userRoute)

app.get('/', (req, res) => {
  res.send('Hello World!');
}



);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}
);