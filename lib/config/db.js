import mongoose from "mongoose";

export const ConnectDB = async () =>{
    await mongoose.connect('mongodb+srv://test2:Ch8016kit@cluster0.rtuwu.mongodb.net/breaking-new');
    console.log("DB Connected");
}