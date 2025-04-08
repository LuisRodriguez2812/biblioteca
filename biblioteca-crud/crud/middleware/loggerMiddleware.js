// loggerMiddleware.js

const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Crear el directorio de logs si no existe
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  try {
    fs.mkdirSync(logDir, { recursive: true }); // Asegurarse de que se creen directorios intermedios si no existen
  } catch (err) {
    console.error('Error al crear el directorio de logs:', err);
  }
}

// Configurar el middleware de registro
const accessLogStream = fs.createWriteStream(path.join(logDir, 'access.log'), { flags: 'a' }); // 'a' asegura que se añaden logs en lugar de sobrescribir

// Middleware de morgan para registrar las solicitudes
const loggerMiddleware = morgan('combined', { stream: accessLogStream });

module.exports = loggerMiddleware;
