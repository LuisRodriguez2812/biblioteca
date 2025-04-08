// crud/database/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'biblioteca',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Probar la conexión al iniciar (mover la prueba al exterior)
(async () => {
  try {
    // Intentar obtener una conexión para asegurarse de que la conexión funciona
    const connection = await pool.getConnection();
    console.log('Conexión exitosa a MySQL');
    // No liberes la conexión aquí, ya que es un pool de conexiones
  } catch (error) {
    console.error('Error al conectar a MySQL:', error);
  }
})();

module.exports = pool;
