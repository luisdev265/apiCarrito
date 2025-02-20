require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require("./db/conection");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
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

app.get("/", async (req, res) => {
  try {
    const conection = await connectDB();
    const [rows] = await conection.execute("SELECT * FROM movimientos");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ msg: "Error al conectar a la base de datos" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
