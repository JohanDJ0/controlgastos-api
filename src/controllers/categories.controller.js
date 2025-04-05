import { pool } from "../db.js";

// Crear nueva categoría
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "El nombre es requerido" });
    }

    const [result] = await pool.query(
      "INSERT INTO categories (name) VALUES (?)",
      [name]
    );

    res.status(201).json({
      id: result.insertId,
      name,
    });
  } catch (error) {
    console.error("Error en createCategory:", error);
    res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};

// Obtener todas las categorías
export const getCategories = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM categories");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};

// Obtener una categoría por ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM categories WHERE id = ?", [id]);

    if (rows.length === 0) return res.status(404).json({ message: "Categoría no encontrada" });

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};

// Eliminar categoría
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("DELETE FROM categories WHERE id = ?", [id]);

    if (result.affectedRows === 0) return res.status(404).json({ message: "Categoría no encontrada" });

    res.json({ message: "Categoría eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};

// Actualizar nombre de categoría
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const [result] = await pool.query("UPDATE categories SET name = ? WHERE id = ?", [name, id]);

    if (result.affectedRows === 0) return res.status(404).json({ message: "Categoría no encontrada" });

    res.json({ message: "Categoría actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};
