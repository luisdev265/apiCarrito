const express = require("express");
const router = express.Router();
const connectDB = require("../db/conection");

// GET movimientos_manuales solo el que tenga el esatdo activo en ese momento
router.get("/", async (req, res) => {
  let connection;
  try {
    const pool = await connectDB();
    connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT movimiento FROM movimientos_manuales where estado_movimiento = 'activado'"
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ msg: "No se encontraron movimientos_manuales" });
    }

    res.json(rows);
  } catch (error) {
    res.status(500).json({ msg: "Error al conectar a la base de datos" });
  } finally {
    if (connection) connection.release();
  }
});

// GET movimientos_manuales por id
router.get("/:id", async (req, res) => {
  let connection;
  try {
    const { id } = req.params;
    const pool = await connectDB();
    connection = await pool.getConnection();

    const [rows] = await connection.execute(
      "SELECT * FROM movimientos_manuales WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ msg: "Movimiento no encontrado" });
    }

    res.json(rows);
  } catch (error) {
    res.status(500).json({ msg: "Error al conectar a la base de datos" });
  } finally {
    if (connection) connection.release();
  }
});

//put para cambiar el estado del movimiento a activado o desactivado
router.put("/modo", async (req, res) => {
  let connection;
  try {
    //declaramos nuestra variables que necesitaremos para hacer las modificaciones correspondientes
    const { id } = req.body;
    const estadoMovimiento = "activado"

    //conectamos a la base de datos y hacemos la consulta correspondiente
    const pool = await connectDB();
    connection = await pool.getConnection();

    //Actualizamos el cambio de estado al siguiente movimiento despues de haber desactivado el cambio ya activo
    const query =
      "UPDATE movimientos_manuales SET estado_movimiento = ? WHERE id_movimiento = ?";
    const [result] = await connection.query(query, [estadoMovimiento, id]);
    if (result.affectedRows === 1) {
      return res.status(200).json({ msg: "Movimiento Actualizado", result });
    } else {
      res.status(400).json({ msg: "Movimiento Actualizado", result });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar el movimiento" });
  } finally {
    if (connection) connection.release();
  }
});

router.put("/status", async (req, res) => {
  let connection;
  try {
    //declaramos nuestras variables que necesitaremos para hacer las modificaciones correspondientes
    const estadoMovimiento = "desactivado";
    const movActivate = "activado";

    //conectamos a la base de datos y hacemos la consulta correspondiente
    const pool = await connectDB();
    connection = await pool.getConnection();

    //Actualizamos el cambio de estado al siguiente movimiento despues de haber desactivado el cambio ya activo
    const query =
      "UPDATE movimientos_manuales SET estado_movimiento = ? WHERE estado_movimiento = ?";
    const [result] = await connection.query(query, [estadoMovimiento, movActivate]);
    
    if (result.affectedRows === 1) {
      return res.status(200).json({ msg: "Movimiento Actualizado", result });
    } else {
      res.status(400).json({ msg: "Movimiento Actualizado", result });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar el movimiento" });
  } finally {
    if (connection) connection.release();
  }
});

module.exports = router;
