import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import { mongoDbConnection } from "./config/mongoDbConnection.js";
import userRouter from './services/routes/userRouter.js'


const app = express();
const PORT = process.env.PORT || 4000;

mongoDbConnection();

const options = {
  origin: "http://localhost:3000",
  method: "GET , HEAD, POST, PUT, PATCH, DELETE",
  Credentials: true,
};

app.use(cors(options));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", userRouter);

app.listen(PORT, () => {
  console.log(`sever start at: http://localhost:${PORT}`);
});