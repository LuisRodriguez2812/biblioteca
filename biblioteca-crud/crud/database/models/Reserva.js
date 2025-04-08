const pool = require('../db');

class Reserva {
  // Crear una nueva reserva
  static async crear({ libro_id, persona_id, fecha_inicio }) {
    const [result] = await pool.execute(
      `INSERT INTO reservas (libro_id, persona_id, fecha_inicio, estado)
       VALUES (?, ?, ?, 'reservado')`,
      [libro_id, persona_id, fecha_inicio || null]
    );
    return result.insertId;
  }

  // Obtener todas las reservas
  static async obtenerTodas() {
    const [rows] = await pool.execute(`
      SELECT r.id, r.fecha_inicio, r.estado,
             l.titulo AS titulo_libro, l.ISBN, c.nombre AS categoria,
             p.nombre AS nombre_usuario, p.apellido AS apellido_usuario,
             p.telefono, p.direccion
      FROM reservas r
      JOIN libros l ON r.libro_id = l.id
      LEFT JOIN categorias c ON l.categoria_id = c.id
      JOIN personas p ON r.persona_id = p.id
    `);
    return rows;
  }

  // Buscar una reserva por ID
  static async encontrarPorId(id) {
    const [rows] = await pool.execute('SELECT * FROM reservas WHERE id = ?', [id]);
    return rows[0];
  }

  // Actualizar una reserva
  static async actualizar(id, { libro_id, persona_id, fecha_inicio }) {
    await pool.execute(
      `UPDATE reservas SET libro_id = ?, persona_id = ?, fecha_inicio = ? WHERE id = ?`,
      [libro_id, persona_id, fecha_inicio || null, id]
    );
  }

  // Eliminar una reserva
  static async eliminar(id) {
    await pool.execute('DELETE FROM reservas WHERE id = ?', [id]);
  }

  // Convertir reserva a préstamo
  static async convertirAPrestamo(reservaId) {
    const [reservaRows] = await pool.execute('SELECT * FROM reservas WHERE id = ?', [reservaId]);
    const reserva = reservaRows[0];
    if (!reserva) throw new Error('Reserva no encontrada');

    // Insertar en préstamos
    await pool.execute(
      `INSERT INTO prestamos (libro_id, persona_id, fecha_inicio, estado)
       VALUES (?, ?, ?, 'prestado')`,
      [reserva.libro_id, reserva.persona_id, reserva.fecha_inicio || new Date()]
    );

    // Eliminar reserva
    await this.eliminar(reservaId);
  }
}

module.exports = Reserva;
