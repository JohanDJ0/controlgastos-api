import { Router } from "express";
import { createBudget } from "../controllers/budget.controller.js";

const router = Router();

router.post("/budgets", createBudget); // Crear presupuesto

export default router;
