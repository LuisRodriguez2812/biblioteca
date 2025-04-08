const pool = require('../db');

class Categoria {
  static async listar() {
    const [rows] = await pool.query('SELECT * FROM categorias');
    return rows;
  }
  
  static async encontrarPorId(id) {
    const [rows] = await pool.query('SELECT * FROM categorias WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = Categoria;