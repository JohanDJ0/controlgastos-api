import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
} from "../controllers/categories.controller.js";

const router = express.Router();

router.post("/categories", createCategory);
router.get("/categories", getCategories);
router.get("/categories/:id", getCategoryById);
router.delete("/categories/:id", deleteCategory);
router.put("/categories/:id", updateCategory);

export default router;
