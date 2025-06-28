import mongoose from "mongoose";
import clientPromise from "./mongoDb";

export async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    const client = await clientPromise;
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("🧠 Connected Mongoose to MongoDB");
  }
}
