const express = require('express');
const router = express.Router();
const connectDB = require('../db/conection');

router.get('/', async (req, res) => {
  try {
    const conection = await connectDB();
    const query = 'SELECT * FROM velocidad';
    const [rows] = await conection.query(query);

    if (rows.length === 0) {
      return res.status(404).json({ msg: 'No se encontraron velocidades registradas' }); 
    }

    res.json(rows); 
  }catch (error) {
    res.status(500).json({ msg: 'Error al obtener las velocidades', error: error.message });
  }
})

router.put('/', async (req, res) => {
  try {
    const id = 1;
    const { velocidad } = req.body;

    if (!velocidad) {
      return res.status(400).json({ msg: 'Faltan datos' });
    }

    const conection = await connectDB();
    const query = 'UPDATE velocidad SET velocidad = ? WHERE id = ?';
    const [result] = await conection.query(query, [velocidad, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'No se pudo actualizar la velocidad' });
    }

    res.status(201).json({ msg: 'Velocidad actualizada' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar la velocidad', error: error.message });
  }
})

module.exports = router;