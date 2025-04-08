// adminController.js
const pool = require('../database/db'); // Asegúrate de que pool esté importado desde tu archivo de conexión con MySQL
const Usuario = require('../database/models/Usuario');
const Libro = require('../database/models/Libro');
const Prestamo = require('../database/models/Prestamo');

// Controlador del dashboard de administrador
exports.dashboard = async (req, res) => {
  try {
    // Obtener estadísticas generales para el dashboard
    const [usuarios] = await pool.execute('SELECT COUNT(*) AS total FROM usuarios');
    const [libros] = await pool.execute('SELECT COUNT(*) AS total FROM libros');
    const [prestamos] = await pool.execute('SELECT COUNT(*) AS total FROM prestamos');

    // Renderizar la vista del dashboard
    res.render('admin/dashboard', {
      totalUsuarios: usuarios[0].total,
      totalLibros: libros[0].total,
      totalPrestamos: prestamos[0].total
    });
  } catch (error) {
    console.error('Error en el controlador de dashboard de administrador:', error);
    res.status(500).send('Ocurrió un error al cargar el dashboard');
  }
};

// Controlador para listar todos los usuarios
exports.listarUsuarios = async (req, res) => {
  try {
    const [usuarios] = await pool.execute('SELECT * FROM usuarios');
    res.render('admin/usuarios', { usuarios });
  } catch (error) {
    console.error('Error en el controlador de listar usuarios de administrador:', error);
    res.status(500).send('Ocurrió un error al cargar la lista de usuarios');
  }
};

// Controlador para listar todos los libros
exports.listarLibros = async (req, res) => {
  try {
    const [libros] = await pool.execute('SELECT * FROM libros');
    res.render('admin/libros', { libros });
  } catch (error) {
    console.error('Error en el controlador de listar libros de administrador:', error);
    res.status(500).send('Ocurrió un error al cargar la lista de libros');
  }
};

// Controlador para listar todos los préstamos
exports.listarPrestamos = async (req, res) => {
  try {
    const [prestamos] = await pool.execute(
      'SELECT prestamos.*, libros.titulo, usuarios.nombre FROM prestamos ' +
      'JOIN libros ON prestamos.libro_id = libros.id ' +
      'JOIN usuarios ON prestamos.usuario_id = usuarios.id'
    );
    res.render('admin/prestamos', { prestamos });
  } catch (error) {
    console.error('Error en el controlador de listar préstamos de administrador:', error);
    res.status(500).send('Ocurrió un error al cargar la lista de préstamos');
  }
};
