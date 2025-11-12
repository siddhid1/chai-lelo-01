import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    title : String , 
    location:String
})

export const Address = mongoose.model("Address", addressSchema);