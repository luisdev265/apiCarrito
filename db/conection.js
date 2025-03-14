const mysql = require("mysql2/promise");

const connectDB = async () => {
  try {
    const pool = await mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
      connectTimeout: 60000, // 60 seconds
      timeout: 60000, // 60 seconds
      enableKeepAlive: true,
      keepAliveInitialDelay: 0
    });

    // Test the connection
    const connection = await pool.getConnection();
    console.log("🟢 Conectado a la base de datos");
    
    await connection.query("SET time_zone = 'America/Mexico_City'");
    connection.release();

    return pool;
  } catch (error) {
    console.error("🔴 Error al conectar a la base de datos:", error.message);
    throw error;
  }
};

module.exports = connectDB;
