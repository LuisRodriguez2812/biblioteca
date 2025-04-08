const pool = require('../db');

class Prestamo {
  static async crear({ libro_id, persona_id, fecha_inicio, fecha_fin, estado }) {
    const [result] = await pool.execute(
      'INSERT INTO prestamos (libro_id, persona_id, fecha_inicio, fecha_fin, estado) VALUES (?, ?, ?, ?, ?)',
      [libro_id, persona_id, fecha_inicio, fecha_fin, estado]
    );
    return result.insertId;
  }

  static async encontrarPorId(id) {
    const [rows] = await pool.execute('SELECT * FROM prestamos WHERE id = ?', [id]);
    return rows[0];
  }

  static async actualizar(id, campos) {
    const keys = Object.keys(campos);
    const values = Object.values(campos);
    const setClause = keys.map(key => `${key} = ?`).join(', ');

    await pool.execute(`UPDATE prestamos SET ${setClause} WHERE id = ?`, [...values, id]);
  }

  static async eliminar(id) {
    await pool.execute('DELETE FROM prestamos WHERE id = ?', [id]);
  }

  static async obtenerTodos() {
    const [rows] = await pool.execute(`
      SELECT prestamos.*, 
             libros.titulo AS titulo_libro, 
             libros.ISBN, 
             categorias.nombre AS categoria, 
             personas.nombre AS nombre_usuario,
             personas.apellido, personas.telefono, personas.direccion
      FROM prestamos 
      JOIN libros ON prestamos.libro_id = libros.id
      LEFT JOIN categorias ON libros.categoria_id = categorias.id
      JOIN personas ON prestamos.usuario_id = personas.id
    `);
    return rows;
  }
}

module.exports = Prestamo;
