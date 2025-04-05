import { Router } from "express";
import { createBudget , getBudgetsByUserId,updateBudgetByUserId} from "../controllers/budget.controller.js";

const router = Router();

router.post("/budgets", createBudget); // Crear presupuesto
router.get("/budgets/user/:user_id", getBudgetsByUserId);
router.put("/budgets/:user_id/:budget_id", updateBudgetByUserId);

export default router;
