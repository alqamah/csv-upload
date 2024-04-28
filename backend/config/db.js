import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    //console.log("db connecting...");
      const res = await mongoose.connect("mongodb://127.0.0.1:27017/csvupload");
    //console.log(`mongodb connected with server ${res.connection.host}`);
  } catch (error) {
    console.log("mongodb connection failed!");
    console.log(error);
  }
};