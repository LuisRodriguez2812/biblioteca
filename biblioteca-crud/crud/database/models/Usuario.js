const bcrypt = require('bcrypt');
const pool = require('../db');  // Asegúrate de tener la conexión a la base de datos

class Usuario {
  // Método para crear un usuario
  static async crear({ email, rol = 'usuario', contrasena, nombre, apellido, telefono, direccion }) {
    const hashedPassword = await bcrypt.hash(contrasena, 10);  // Hashear la contraseña
    const [result] = await pool.execute(
      `INSERT INTO usuarios (email, rol, contrasena, nombre, apellido, telefono, direccion)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [email, rol, hashedPassword, nombre, apellido, telefono, direccion]
    );
    return result.insertId;
  }

  // Método para encontrar un usuario por email
  static async encontrarPorEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0];
  }

  // Método para comparar la contraseña
  static async compararPassword(contrasena, hashedPassword) {
    return await bcrypt.compare(contrasena, hashedPassword);  // Compara las contraseñas
  }

  // Método para listar todos los usuarios
  static async listar() {
    const [rows] = await pool.execute('SELECT * FROM usuarios');
    return rows;
  }
}

module.exports = Usuario;
