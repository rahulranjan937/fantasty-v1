import mongoose from "mongoose";

const connectDB = async (URL) => {
  try {
    await mongoose.connect(URL, {});

    console.log("MongoDB Connected....");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export { connectDB };
