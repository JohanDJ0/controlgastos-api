import { Router } from "express";
import { createUser, getUsers, getUserById } from "../controllers/user.Controller.js";

const router = Router();

router.post("/users", createUser);
router.get("/users", getUsers); // Obtener todos los usuarios
router.get("/users/:id", getUserById); // Obtener usuario por ID
export default router;
