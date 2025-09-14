import express from "express";
import { login, logout, signup } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Auth route hit");
});

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/profile", protect, (req, res) => {
  return res.status(200).json({ message: "Profile page" });
});

router.get("/me", protect, (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
});

export default router;
