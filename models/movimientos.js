const express = require("express");
const router = express.Router();
const connectDB = require("../db/conection");

router.post("/", async (req, res) => {
  try {
    const { movimiento } = req.body;

    if (!movimiento) {
      return res.status(400).json({ msg: "Faltan datos" });
    }

    const conection = await connectDB();
    const query = "INSERT INTO movimientos (movimiento) VALUES (?)";

    await conection.query(query, [movimiento]);

    res.status(201).json({ msg: "Movimiento registrado" });
  } catch (error) {
    res
      .status(500)
      .json({
        msg: "Error al conectar a la base de datos",
        ERROR: error.message,
      });
  }
});

router.get("/", async (req, res) => {
  try {
    const conection = await connectDB();
    const [rows] = await conection.execute(
      "SELECT id, DATE_FORMAT(fechaYhora, '%Y-%m-%d') AS fecha, TIME_FORMAT(fechaYhora, '%H:%i:%s') AS hora, movimiento FROM movimientos"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ msg: "Error al conectar a la base de datos" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const conection = await connectDB();
    const [rows] = await conection.execute(
      "SELECT id, DATE_FORMAT(fechaYhora, '%Y-%m-%d') AS fecha, TIME_FORMAT(fechaYhora, '%H:%i:%s') AS hora, movimiento FROM movimientos WHERE id = ?",
      [id]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ msg: "Error al conectar a la base de datos" });
  }
});

router.delete("/", async (req, res) => {
  try {
    
    const conection = await connectDB();
    const query = "DELETE FROM movimientos";
    const query2 = "ALTER TABLE movimientos AUTO_INCREMENT = 1"
    const [ rows ] = await conection.query(query);
    await conection.query(query2);

    if (rows.affectedRows > 0) {
      return res.status(200).json({ msg: "Base de datos limpiada con exito" });
    }

    res.json({ msg: "Movimiento eliminado" });
  } catch (error) {
    res.status(500).json({ msg: "Error al conectar a la base de datos" });
  }
});

module.exports = router;
