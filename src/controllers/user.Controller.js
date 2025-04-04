import { pool } from "../db.js"; 
import bcrypt from "bcryptjs"; 

export const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son requeridos" });
    }

    // Verificar si el correo ya está registrado
    const [existingUser] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Encriptar la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insertar usuario con la contraseña encriptada
    const [rows] = await pool.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );

    res.send({
      id: rows.insertId,
      email,
    });
  } catch (error) {
    console.error("Error en createUser:", error); // 🔹 Mostrará el error en la terminal
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message, // 🔹 Muestra el error real en la respuesta
    });
  }
};


// Obtener todos los usuarios
export const getUsers = async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT id, email, created_at FROM users"); // Excluimos la contraseña por seguridad
      res.json(rows);
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  };
  
  // Obtener un usuario por ID
  export const getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query("SELECT id, email, created_at FROM users WHERE id = ?", [id]);
  
      if (rows.length === 0) return res.status(404).json({ message: "User not found" });
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  };
