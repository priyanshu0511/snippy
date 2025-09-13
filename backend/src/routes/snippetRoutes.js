import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createSnippet,
  deleteSnippet,
  getAllSnippets,
  getSingleSnippet,
  updateSnippet,
} from "../controllers/snippetController.js";

const router = express.Router();

router.post("/create", protect, createSnippet);

router.get("/getallsnippets", protect, getAllSnippets);

router.get("/:id", protect, getSingleSnippet);

router.put("/:id", protect, updateSnippet);

router.delete("/:id", protect, deleteSnippet);

export default router;
