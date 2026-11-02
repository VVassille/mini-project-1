import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// posts creation
router.post("/", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Authorized user",
    user: req.user,
  });
});

// getting post
router.get("/", (req, res) => {});

export default router;
