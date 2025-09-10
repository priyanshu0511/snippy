import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createSnippet,
  getAllSnippets,
} from "../controllers/snippetController.js";

const router = express.Router();

router.post("/create", protect, createSnippet);

router.get("/getallsnippets", protect, getAllSnippets);

export default router;
