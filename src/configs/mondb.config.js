import mongoose from "mongoose";

const url = process.env.MONGODB_URL;
const connectToMongoDB = async()=>{
    try{
        await mongoose.connect(url);
        console.log('db connected');
    }
    catch(err){
        console.log(err);

    }
}

export default connectToMongoDB;