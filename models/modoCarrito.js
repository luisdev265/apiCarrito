const express = require("express");
const router = express.Router();
const connectDB = require("../db/conection");

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const conection = await connectDB();
        const query = "Select modo from autoManual where id = ?"
        const [rows] = await conection.query(query, [id]);
        res.status(201).json(rows);
    } catch (error) {
        res.status(500).json({ msg: "error al hacer la consulta", error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {modo} = req.body;
        if (!modo) {
            return res.status(400).json({ msg: "Faltan datos" });
        }

        const conection = await connectDB();
        const query = "UPDATE autoManual SET modo = ? where id = ?";
        const [rows] = await conection.query(query, [modo, id]);

        res.status(201).json({ msg: "Modo actualizado", rows});
    } catch (error) {
        res.status(500).json({ msg: "Error al hacer la consulta", ERROR: error.message });
    }
});

module.exports = router;