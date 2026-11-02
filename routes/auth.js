import express from "express";
import bcrypt from "bcrypt";
import { getDB } from "../config/db.js";
const router = express.Router();

// user registration
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check required fields
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    const db = getDB();
    const users = db.collection("users");

    // Check if user already exists
    const existingUser = await users.findOne({ username });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const result = await users.insertOne({
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertedId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// user login
router.post("/login", (req, res) => {});
export default router;
