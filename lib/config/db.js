import mongoose from "mongoose";

export const ConnectDB = async () =>{
    await mongoose.connect('mongodb+srv://hieu1212:bigboss1212@cluster0.pqu2r.mongodb.net/breakingnew');
    console.log("DB Connected");
}