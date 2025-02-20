require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require("./db/conection");
const movimiento = require("./models/movimientos");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/movimientos', movimiento);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
