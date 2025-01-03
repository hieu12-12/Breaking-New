import mongoose from "mongoose";

export const ConnectDB = async () =>{
    await mongoose.connect('mongodb+srv://courtneymcd01:QawDV4Xu0nG8yUBa@cluster0.io1iq.mongodb.net/breaking-new')
    console.log("DB Connected");
}