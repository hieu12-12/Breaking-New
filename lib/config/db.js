import mongoose from "mongoose";

export const ConnectDB = async () =>{
    await mongoose.connect('mongodb+srv://courtneymcd01:Breaking-news1@cluster0.io1iq.mongodb.net/breaking-new');
    console.log("DB Connected");
}