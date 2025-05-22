import mongoose from "mongoose";



const connectDB = async ()=>{
    mongoose.connect(process.env.MONGO_URI, {
       
    }).then((data)=>{
        console.log(`MongoDB connected with server`);
    }).catch((error)=>{
        console.log(error);
    });

}


export default connectDB;