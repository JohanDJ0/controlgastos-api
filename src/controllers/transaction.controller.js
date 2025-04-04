import { pool } from "../db.js";

// Crear una nueva transacción
export const createTransaction = async (req, res) => {
  try {
    const { user_id, category_id, type, amount, description } = req.body;

    // Validaciones básicas
    if (!user_id || !category_id || !type || !amount) {
      return res.status(400).json({ message: "Faltan campos obligatorios." });
    }

    // Validar que el tipo sea correcto
    if (type !== "gasto" && type !== "ingreso") {
      return res.status(400).json({ message: "Tipo de transacción inválido (debe ser 'gasto' o 'ingreso')" });
    }

    // Insertar en la base de datos
    const [result] = await pool.query(
      `INSERT INTO transactions (user_id, category_id, type, amount, description)
       VALUES (?, ?, ?, ?, ?)`,
      [user_id, category_id, type, amount, description]
    );

    res.status(201).json({
      id: result.insertId,
      user_id,
      category_id,
      type,
      amount,
      description,
    });
  } catch (error) {
    console.error("Error en createTransaction:", error);
    res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};

// Obtener transacciones de un usuario
export const getTransactionsByUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    const [rows] = await pool.query(
      `SELECT t.*, c.name AS category_name
       FROM transactions t
       JOIN categories c ON t.category_id = c.id
       WHERE t.user_id = ?`,
      [user_id]
    );

    res.json(rows);
  } catch (error) {
    console.error("Error en getTransactionsByUser:", error);
    res.status(500).json({ message: "Error al obtener transacciones", error: error.message });
  }
};
