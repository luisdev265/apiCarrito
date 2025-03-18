const express = require("express");
const router = express.Router();
const connectDB = require("../db/conection");

router.post("/", async (req, res) => {
    try {
  
      const {movimiento} = req.body;
  
      if (!movimiento) {
        return res.status(400).json({ msg: "Faltan datos" });
      }
  
      const conection = await connectDB();
      const query = "INSERT INTO movimientos (movimiento) VALUES (?)";
  
      await conection.query(query, [movimiento]);
  
      res.status(201).json({ msg: "Movimiento registrado" });
  
    }catch (error) {
      res.status(500).json({ msg: "Error al conectar a la base de datos", ERROR: error.message });
  
    }
  });

  router.get("/", async (req, res) => {
    try {
      const conection = await connectDB();
      const [rows] = await conection.execute("SELECT id, DATE_FORMAT(fechaYhora, '%Y-%m-%d') AS fecha, TIME_FORMAT(fechaYhora, '%H:%i:%s') AS hora, movimiento FROM movimientos");
      res.json(rows);
    } catch (error) {
      res.status(500).json({ msg: "Error al conectar a la base de datos" });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const conection = await connectDB();
      const [rows] = await conection.execute( "SELECT id, DATE_FORMAT(fechaYhora, '%Y-%m-%d') AS fecha, TIME_FORMAT(fechaYhora, '%H:%i:%s') AS hora, movimiento FROM movimientos WHERE id = ?", [id]);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ msg: "Error al conectar a la base de datos" });
    }
  });

  //GET Ultimo movimiento
router.get("/ultimo", async (req, res) => {
  let connection;
  try {
    const pool = await connectDB();
    connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT movimiento FROM movimientos ORDER BY id DESC LIMIT 1"
    );

    if (rows.length === 0) {
      return res.status(404).json({ msg: "No se encontraron movimientos" });
    }
    
    res.json(rows);
  } catch (error) {
    res.status(500).json({ msg: "Error al conectar a la base de datos" });
  } finally {
    if (connection) connection.release();
  }
});

  module.exports = router;