import mongoose from "mongoose";
import { DB_NAME , MONGO_URL } from "../utils/constants.js";

const connectDB = async()=>{
    try {
        console.log("this is working")
        // console.log(`${process.env.MONGODB_URL}/${DB_NAME}`)
        const connectionInstance =  await mongoose.connect(`${MONGO_URL}/${DB_NAME}`);
        console.log(`${MONGO_URL}/${DB_NAME}`)
    //    const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);

       console.log(`MONGODB CONNECTED : HOST ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("yahan fatt raha ")
        console.log(": ",error);
        throw error

    }
}

export default connectDB