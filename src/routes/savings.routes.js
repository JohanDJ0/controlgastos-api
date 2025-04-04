import { Router } from "express";
import {
  createSavings,
  addSavingsTransaction,
  getSavingsById,
  getSavingsByUserId,
  getSavingsTransactions,
} from "../controllers/savings.controller.js";

const router = Router();

// Crear un apartado de ahorro
router.post("/savings", createSavings);

// Agregar transacción (ingreso o egreso) al apartado de ahorro
router.post("/savings/transaction", addSavingsTransaction);

// Obtener un apartado de ahorro por ID
router.get("/savings/:id", getSavingsById);

router.get("/savings/user/:user_id", getSavingsByUserId);  // Aquí user_id es parte de la URL

// Obtener todas las transacciones de un apartado de ahorro
router.get("/savings/transactions/:savings_id", getSavingsTransactions);

export default router;
