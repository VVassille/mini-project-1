import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/posts.js";

const app = express();
const PORT = process.env.PORT || 3333;
app.use(express.json());

// 1. /auth/register  2. /auth/login
app.use("/auth", authRouter);

// 1. /post/ 2 /post/
app.use("/posts", postRouter);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Serverul lucrează pe portul ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
