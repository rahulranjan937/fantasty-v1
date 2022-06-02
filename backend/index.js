import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import { connectDB } from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

// Connect Database
connectDB(MONGO_URL);

const app = express();

app.use(morgan("dev"));

app.use(cors());

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const status = (req, res) => {
  res.json({
    status: "success",
    message: "Server is running",
  });
};

// Use Routes
app.get("/", status);

app.use("/api/users", userRoutes);

//Server
app
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.log(err);
  });
