import { Router } from "express";
import { createBudget , getBudgetsByUserId} from "../controllers/budget.controller.js";

const router = Router();

router.post("/budgets", createBudget); // Crear presupuesto
router.get("/budgets/user/:user_id", getBudgetsByUserId);

export default router;
