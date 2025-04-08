const Prestamo = require('../database/models/Prestamo');
const Libro = require('../database/models/Libro');
const Usuario = require('../database/models/Usuario');
const db = require('../database/db'); // Necesario para insertar en historial directamente

const prestamoController = {
  async mostrarPrestamos(req, res) {
    try {
      const prestamos = await Prestamo.obtenerTodos();
      const libros = await Libro.listar();
      const usuarios = await Usuario.listar();
      res.render('prestamos/lista', { prestamos, libros, usuarios });
    } catch (error) {
      console.error('Error al obtener los préstamos:', error);
      res.status(500).json({ error: 'Error al cargar los préstamos', detalles: error.message });
    }
  },

  async mostrarFormularioCrear(req, res) {
    try {
      const libros = await Libro.listar();
      res.render('prestamos/crear', { libros });
    } catch (error) {
      console.error('Error al cargar el formulario de creación de préstamo:', error);
      res.status(500).json({ error: 'Error al cargar el formulario de creación de préstamo', detalles: error.message });
    }
  },

  async crearPrestamo(req, res) {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: 'No autorizado. Token inválido o expirado.' });
      }

      const { libroId, fechaInicio, fechaFin } = req.body;
      const libro = await Libro.encontrarPorId(libroId);
      if (!libro) return res.status(404).json({ error: 'El libro no existe' });

      if (libro.estado !== 'disponible') {
        return res.status(400).json({ error: `El libro ${libro.titulo} no está disponible para prestar.` });
      }

      const usuarioId = req.user.id;

      await Prestamo.crear({
        libro_id: libroId,
        usuario_id: usuarioId,
        fecha_inicio: new Date(fechaInicio),
        fecha_fin: new Date(fechaFin),
        estado: 'activo'
      });

      await Libro.actualizar(libroId, { estado: 'prestado' });
      res.redirect('/prestamos');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al procesar el préstamo del libro.', detalles: error.message });
    }
  },

  async devolverPrestamo(req, res) {
    try {
      const { id } = req.params;
      const prestamo = await Prestamo.encontrarPorId(id);
      if (!prestamo) return res.status(404).json({ error: 'Préstamo no encontrado' });

      if (prestamo.estado !== 'activo') {
        return res.status(400).json({ error: 'El préstamo no está activo o ya ha sido completado' });
      }

      await Prestamo.actualizar(id, { estado: 'completado' });

      await db.execute(
        'INSERT INTO historial (persona_id, libro_id, tipo, fecha, estado) VALUES (?, ?, ?, NOW(), ?)',
        [prestamo.usuario_id, prestamo.libro_id, 'prestamo', 'cancelado']
      );

      await db.execute('UPDATE libros SET stock = stock + 1 WHERE id = ?', [prestamo.libro_id]);
      await db.execute('UPDATE libros SET estado = "disponible" WHERE id = ? AND stock > 0', [prestamo.libro_id]);

      res.redirect('/prestamos');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al procesar la devolución del libro.', detalles: error.message });
    }
  },

  async eliminarPrestamo(req, res) {
    try {
      const { id } = req.params;
      const prestamo = await Prestamo.encontrarPorId(id);
      if (!prestamo) return res.status(404).json({ error: 'Préstamo no encontrado' });

      await Prestamo.eliminar(id);
      await Libro.actualizar(prestamo.libro_id, { estado: 'disponible' });
      res.redirect('/prestamos');
    } catch (error) {
      console.error('Error al eliminar préstamo:', error);
      res.status(500).json({ error: 'Error al eliminar el préstamo', detalles: error.message });
    }
  },

  async actualizarPrestamo(req, res) {
    try {
      const { id } = req.params;
      const { libroId, usuarioId, fechaInicio, fechaFin, estado } = req.body;

      const prestamo = await Prestamo.encontrarPorId(id);
      if (!prestamo) return res.status(404).json({ error: 'Préstamo no encontrado' });

      await Prestamo.actualizar(id, {
        libro_id: libroId,
        usuario_id: usuarioId,
        fecha_inicio: new Date(fechaInicio),
        fecha_fin: new Date(fechaFin),
        estado
      });

      if (prestamo.libro_id !== libroId) {
        await Libro.actualizar(prestamo.libro_id, { estado: 'disponible' });
        await Libro.actualizar(libroId, { estado: 'prestado' });
      }

      res.redirect('/prestamos');
    } catch (error) {
      console.error('Error al actualizar el préstamo:', error);
      res.status(500).json({ error: 'Error al actualizar el préstamo', detalles: error.message });
    }
  }
};

module.exports = prestamoController;
