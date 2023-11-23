import mongoose from "mongoose";
require("dotenv").config();

const connectDb = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState !== 1) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error(
        process.env.MONGO_URI,
        "Failed to connect to MongoDB:",
        error
      );
      // Handle the error as needed
      return;
    }
  }

  return handler(req, res);
};

export default connectDb;
