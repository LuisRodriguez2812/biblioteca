const pool = require('../db');

class Libro {
  // 📌 CREATE - Crear un nuevo libro
  static async crear(titulo, autor, ISBN, estado = 'disponible', categoriaId, stock = 1) {
    try {
      const [result] = await pool.execute(
        'INSERT INTO libros (titulo, autor, ISBN, estado, categoria_id, stock) VALUES (?, ?, ?, ?, ?, ?)',
        [titulo, autor, ISBN, estado, categoriaId || null, stock]
      );
      return result.insertId;
    } catch (error) {
      console.error('Error al crear el libro:', error.sqlMessage || error);
      throw error;
    }
  }

  // 📖 READ - Obtener todos los libros
  static async listar() {
    try {
      const [rows] = await pool.execute(`
        SELECT l.*, c.nombre AS categoria 
        FROM libros l 
        LEFT JOIN categorias c ON l.categoria_id = c.id
      `);
      return rows;
    } catch (error) {
      console.error('Error al obtener los libros:', error.sqlMessage || error);
      throw error;
    }
  }

  static async listarDisponibles() {
    try {
      const [rows] = await pool.execute(`
        SELECT l.*, c.nombre AS categoria 
        FROM libros l 
        LEFT JOIN categorias c ON l.categoria_id = c.id
        WHERE l.estado = 'disponible' AND l.stock > 0
      `);
      return rows;
    } catch (error) {
      console.error('Error al obtener los libros disponibles:', error.sqlMessage || error);
      throw error;
    }
  }

  static async listarPrestamos() {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM libros WHERE estado = "prestado"'
      );
      return rows;
    } catch (error) {
      console.error('Error al obtener libros prestados:', error.sqlMessage || error);
      throw error;
    }
  }

  static async encontrarPorId(id) {
    try {
      const [rows] = await pool.execute(
        'SELECT l.*, c.nombre AS categoria FROM libros l LEFT JOIN categorias c ON l.categoria_id = c.id WHERE l.id = ?', 
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      console.error(`Error al encontrar el libro con ID ${id}:`, error.sqlMessage || error);
      throw error;
    }
  }

  static async encontrarPorISBN(ISBN) {
    try {
      if (!ISBN) {
        throw new Error('El ISBN proporcionado es inválido o está vacío.');
      }

      const [rows] = await pool.execute(
        'SELECT * FROM libros WHERE ISBN = ?',
        [ISBN]
      );

      return rows[0] || null;
    } catch (error) {
      console.error(`Error al buscar libro con ISBN "${ISBN}":`, error.sqlMessage || error);
      throw error;
    }
  }

  static async actualizar(id, campos) {
    try {
      const camposFiltrados = Object.fromEntries(
        Object.entries(campos).filter(([_, value]) => value !== undefined)
      );

      if (Object.keys(camposFiltrados).length === 0) {
        throw new Error('No hay campos válidos para actualizar');
      }

      const setClause = Object.keys(camposFiltrados)
        .map(key => `${key} = ?`)
        .join(', ');

      const values = [...Object.values(camposFiltrados), id];

      const query = `UPDATE libros SET ${setClause} WHERE id = ?`;

      const [result] = await pool.execute(query, values);
      return result;
    } catch (error) {
      console.error(`Error al actualizar el libro con ID ${id}:`, error.sqlMessage || error);
      throw error;
    }
  }

  static async eliminar(id) {
    try {
      await pool.execute('DELETE FROM libros WHERE id = ?', [id]);
    } catch (error) {
      console.error(`Error al eliminar el libro con ID ${id}:`, error.sqlMessage || error);
      throw error;
    }
  }

  static async buscarPorTitulo(titulo) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM libros WHERE LOWER(titulo) LIKE LOWER(?)',
        [`%${titulo}%`]
      );
      return rows;
    } catch (error) {
      console.error(`Error al buscar el libro con título "${titulo}":`, error.sqlMessage || error);
      throw error;
    }
  }

  // 🆕 Método para obtener todos los libros (para otros módulos)
  static async obtenerTodos() {
    try {
      const [rows] = await pool.execute('SELECT * FROM libros');
      return rows;
    } catch (error) {
      console.error('Error al obtener todos los libros:', error.sqlMessage || error);
      throw error;
    }
  }
}

module.exports = Libro;
