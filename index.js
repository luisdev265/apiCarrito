require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const movimiento = require("./models/movimientos");
const modoCarrito = require("./models/modoCarrito");
const modoManual = require("./models/modoManual");
const velocidad = require("./models/velocidad");
const distancia = require("./models/distancia");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/movimientos', movimiento);
app.use('/modoCarrito', modoCarrito);
app.use('/modoManual', modoManual);
app.use('/velocidad', velocidad);
app.use('/distancia', distancia);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
