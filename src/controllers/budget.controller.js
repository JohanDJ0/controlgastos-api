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

