const mysql = require('mysql2/promise'); // <-- Usa la versión promisificada

const connectDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD, // Asegúrate de que la contraseña es correcta
            database: process.env.DB_NAME,
            port: process.env.DB_PORT
        });

        console.log('🟢 Conectado a la base de datos');
        return connection;
    } catch (error) {
        console.error('🔴 Error al conectar a la base de datos:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
