import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import { connectDB } from "./config/db.js";

import router from "./routes/index.js";
import docs from "../docs/index.js";

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

app.use("/", router);

// API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(docs));

app.use("/swagger.json", (req, res) => {
  res.json(docs);
});

//Server
app
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.log(err);
  });
