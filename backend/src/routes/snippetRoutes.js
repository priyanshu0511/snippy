import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createSnippet } from "../controllers/snippetController.js";

const router = express.Router();

router.post("/create", protect, createSnippet);

export default router;
