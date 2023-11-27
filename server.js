import { app } from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const { DB_HOST: uriDb } = process.env;
const connection = mongoose.connect(uriDb);

async function startServer() {
  try {
    await connection;
    console.log("DB connected");
    app.listen(3000, function () {
      console.log("API listening");
    });
  } catch (err) {
    console.log("DB not connected");
    process.exit(1);
  }
}

startServer();
