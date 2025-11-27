import mongoose from "mongoose";


const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://vishnudb:vsdb1234@cluster0.e1l6gso.mongodb.net/?appName=Cluster0');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Stop app if DB fails
  }
};

export default connectDB;
