import { Router } from "express";
import {
  createTransaction,
  getTransactionsByUser,
} from "../controllers/transaction.controller.js";

const router = Router();

router.post("/transactions", createTransaction); // Crear transacción
router.get("/transactions/:user_id", getTransactionsByUser); // Obtener transacciones por usuario

export default router;
