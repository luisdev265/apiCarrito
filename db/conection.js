const mysql = require('mysql2/promise'); // <-- Usa la versión promisificada

const connectDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '', // Asegúrate de que la contraseña es correcta
            database: 'carrito'
        });

        console.log('🟢 Conectado a la base de datos');
        return connection;
    } catch (error) {
        console.error('🔴 Error al conectar a la base de datos:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
