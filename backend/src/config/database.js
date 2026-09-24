import mongoose from "mongoose";
import "dotenv/config.js";
const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`Database connected successfully`);
  } catch (error) {
    console.log(`Database connection failed with the Error:${error} `);
    process.exit(1);
  }
};


export default connectDB