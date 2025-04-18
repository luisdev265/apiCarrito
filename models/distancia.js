const express = require("express");
const router = express.Router();
const connectDB = require("../db/conection");

router.get("/", async (req, res) => {
    try {
        const conection = await connectDB();
        const query = "SELECT distancia FROM distancia";
        const [rows] = await conection.query(query);

        if (rows.length === 0) {
            return res.status(404).json({ msg: "No se encontraron distancias registradas" });
        }

        res.status(201).json(rows);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener las distancias", error: error.message });
    }
})

router.put('/', async (req, res) => {
    try {
        const id = 1;
        const { distancia } = req.body; 

        if (!distancia) {
            return res.status(400).json({ msg: 'Faltan datos' });
        }

        const conection = await connectDB();
        const query = 'UPDATE distancia SET distancia =? WHERE id_distancia =?';
        const [result] = await conection.query(query, [distancia, id]);

        if (result.affectedRows > 0) {

            const query2 = 'select * from distancia where id_distancia =?'
            const [rows] = await conection.query(query2, id);

            return res.status(200).json({ msg: 'Distancia actualizada correctamente', distancia: rows });
        }
        
        return res.status(404).json({ msg: 'No se pudo actualizar la distancia' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar la distancia', error: error.message }); 
    } 
})

module.exports = router;