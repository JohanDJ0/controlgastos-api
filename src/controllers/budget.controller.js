import { pool } from "../db.js";

export const createBudget = async (req, res) => {
  try {
    const { user_id, amount } = req.body;

    if (!user_id || !amount) {
      return res.status(400).json({ message: "User ID y cantidad son requeridos" });
    }

    // Insertar presupuesto
    const [rows] = await pool.query(
      "INSERT INTO budgets (user_id, amount) VALUES (?, ?)",
      [user_id, amount]
    );

    res.status(201).json({
      id: rows.insertId,
      user_id,
      amount,
      created_at: new Date(),
    });
  } catch (error) {
    console.error("Error en createBudget:", error);
    return res.status(500).json({
      message: "Algo salió mal",
      error: error.message,
    });
  }
};


export const getBudgetsByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({ message: "El user_id es requerido" });
    }

    const [rows] = await pool.query("SELECT * FROM budgets WHERE user_id = ?", [user_id]);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const updateBudgetByUserId = async (req, res) => {
  try {
    const { user_id, budget_id } = req.params;
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "El monto es requerido para actualizar" });
    }

    // Verificar si el presupuesto existe y pertenece al usuario
    const [existing] = await pool.query(
      "SELECT * FROM budgets WHERE id = ? AND user_id = ?",
      [budget_id, user_id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: "Presupuesto no encontrado para este usuario" });
    }

    // Actualizar presupuesto
    await pool.query("UPDATE budgets SET amount = ? WHERE id = ? AND user_id = ?", [
      amount,
      budget_id,
      user_id,
    ]);

    res.json({
      message: "Presupuesto actualizado correctamente",
      budget_id,
      user_id,
      amount,
    });
  } catch (error) {
    console.error("Error en updateBudgetByUserId:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};
