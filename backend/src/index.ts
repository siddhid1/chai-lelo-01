import express from "express";
import dotenv from "dotenv";
dotenv.config({
  path: "./env",
});
import mainRouter from "./routes/index.js";
import connectDB from "./config/db.js";


const PORT = process.env.PORT || 3000;
connectDB()
const app = express();

app.use(express.json());


app.use("/api/v1",mainRouter)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `);
});
