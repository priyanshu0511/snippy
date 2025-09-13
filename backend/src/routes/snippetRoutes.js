import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createSnippet,
  getAllSnippets,
  getSingleSnippet,
} from "../controllers/snippetController.js";

const router = express.Router();

router.post("/create", protect, createSnippet);

router.get("/getallsnippets", protect, getAllSnippets);

router.get("/:id",protect,getSingleSnippet);

export default router;
