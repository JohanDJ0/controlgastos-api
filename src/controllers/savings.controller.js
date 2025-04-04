import { pool } from "../db.js";

export const createSavings = async (req, res) => {
    try {
      const { amount, description } = req.body;
      const user_id = req.user.id;  // Asegúrate de que el `user_id` venga del token o sesión autenticada
  
      if (!amount) {
        return res.status(400).json({ message: "El monto es requerido" });
      }
  
      // Crear el apartado de ahorro
      const [rows] = await pool.query(
        "INSERT INTO savings (user_id, amount, description) VALUES (?, ?, ?)",
        [user_id, amount, description]
      );
  
      res.status(201).json({
        id: rows.insertId,
        user_id,
        amount,
        description,
      });
    } catch (error) {
      console.error("Error en createSavings:", error);
      return res.status(500).json({
        message: "Something went wrong",
        error: error.message,
      });
    }
  };
  

  export const addSavingsTransaction = async (req, res) => {
    try {
      const { savings_id, amount, type, description } = req.body;
      const user_id = req.user.id;  // Asegúrate de que el `user_id` esté en el token o sesión
  
      if (!savings_id || !amount || !type) {
        return res.status(400).json({ message: "Faltan datos necesarios" });
      }
  
      if (!['ingreso', 'egreso'].includes(type)) {
        return res.status(400).json({ message: "Tipo de transacción no válido" });
      }
  
      // Obtener el saldo actual del apartado de ahorro asociado al usuario
      const [savings] = await pool.query("SELECT * FROM savings WHERE id = ? AND user_id = ?", [savings_id, user_id]);
      if (savings.length === 0) {
        return res.status(404).json({ message: "Ahorro no encontrado o no pertenece a este usuario" });
      }
  
      // Actualizar el saldo del apartado de ahorro según el tipo de transacción
      let newAmount;
      if (type === 'ingreso') {
        newAmount = savings[0].amount + amount;
      } else if (type === 'egreso') {
        newAmount = savings[0].amount - amount;
      }
  
      // Actualizar el saldo en la tabla de ahorros
      await pool.query("UPDATE savings SET amount = ? WHERE id = ?", [newAmount, savings_id]);
  
      // Insertar la transacción
      const [rows] = await pool.query(
        "INSERT INTO savings_transactions (savings_id, amount, type, description) VALUES (?, ?, ?, ?)",
        [savings_id, amount, type, description]
      );
  
      res.status(201).json({
        id: rows.insertId,
        savings_id,
        amount,
        type,
        description,
      });
    } catch (error) {
      console.error("Error en addSavingsTransaction:", error);
      return res.status(500).json({
        message: "Something went wrong",
        error: error.message,
      });
    }
  };

  export const getSavingsById = async (req, res) => {
    try {
      const { id } = req.params;
      const user_id = req.user.id;  // Asegúrate de que el `user_id` esté en el token o sesión
  
      // Obtener el apartado de ahorro con el ID proporcionado y asociado al `user_id`
      const [savings] = await pool.query("SELECT * FROM savings WHERE id = ? AND user_id = ?", [id, user_id]);
  
      if (savings.length === 0) {
        return res.status(404).json({ message: "Ahorro no encontrado o no pertenece a este usuario" });
      }
  
      res.json(savings[0]);
    } catch (error) {
      console.error("Error en getSavingsById:", error);
      return res.status(500).json({
        message: "Something went wrong",
        error: error.message,
      });
    }
  };
  
// Obtener todos los apartados de ahorro de un usuario
export const getSavingsByUserId = async (req, res) => {
    try {
      const { user_id } = req.params; // Se obtiene el user_id desde los parámetros de la ruta
  
      // Obtener todos los apartados de ahorro de un usuario
      const [savings] = await pool.query("SELECT * FROM savings WHERE user_id = ?", [user_id]);
      
      if (savings.length === 0) {
        return res.status(404).json({ message: "No se encontraron apartados de ahorro para este usuario" });
      }
  
      res.json(savings);
    } catch (error) {
      console.error("Error en getSavingsByUserId:", error);
      return res.status(500).json({
        message: "Something went wrong",
        error: error.message,
      });
    }
  };
  
  // Obtener todas las transacciones de un apartado de ahorro
  export const getSavingsTransactions = async (req, res) => {
    try {
      const { savings_id } = req.params;
      const user_id = req.user.id;  // Asegúrate de que el `user_id` esté en el token o sesión
  
      // Obtener el apartado de ahorro asociado al usuario
      const [savings] = await pool.query("SELECT * FROM savings WHERE id = ? AND user_id = ?", [savings_id, user_id]);
  
      if (savings.length === 0) {
        return res.status(404).json({ message: "Ahorro no encontrado o no pertenece a este usuario" });
      }
  
      // Obtener todas las transacciones del apartado de ahorro
      const [transactions] = await pool.query("SELECT * FROM savings_transactions WHERE savings_id = ?", [savings_id]);
  
      if (transactions.length === 0) {
        return res.status(404).json({ message: "No se encontraron transacciones para este apartado de ahorro" });
      }
  
      res.json(transactions);
    } catch (error) {
      console.error("Error en getSavingsTransactions:", error);
      return res.status(500).json({
        message: "Something went wrong",
        error: error.message,
      });
    }
  };