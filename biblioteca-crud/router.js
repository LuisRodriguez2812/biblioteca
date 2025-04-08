const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { isAuthenticated, isAdmin } = require('../biblioteca-crud/crud/middleware/authMiddleware'); // Asegúrate de que la ruta sea correcta

// Middleware de autenticación (usando JWT)
function verificarAutenticacion(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    req.flash('error', 'Debes iniciar sesión para acceder.');
    return res.redirect('/visitante/login'); // Redirige a la vista de login en visitante
  }
  jwt.verify(token, process.env.JWT_SECRET || 'secret_key', (err, decoded) => {
    if (err) {
      req.flash('error', 'El token es inválido o ha expirado.');
      return res.redirect('/visitante/login');
    }
    req.usuario = decoded;
    next();
  });
}

// Middleware de autorización de administrador
function esAdmin(req, res, next) {
  if (req.usuario && req.usuario.rol === 'admin') {
    return next();
  }
  req.flash('error', 'Acceso denegado, necesitas privilegios de administrador.');
  res.redirect('/');
}

// Modelos
const Libro = require('./crud/database/models/Libro');
const Prestamo = require('./crud/database/models/Prestamo');
const Reserva = require('./crud/database/models/Reserva');
const Usuario = require('./crud/database/models/Usuario');

// Controladores
const libroController = require('./crud/controllers/libroController');
const usuarioController = require('./crud/controllers/usuarioController');
const prestamoController = require('./crud/controllers/prestamoController');
const reservaController = require('./crud/controllers/reservaController');
const historialController = require('./crud/controllers/historialController');
const adminController = require('./crud/controllers/AdminController');

// Rutas de historial
const historialRoutes = require('./crud/routes/historialRoutes');
router.use('/historial', historialRoutes);

// ————— Rutas públicas —————
// La raíz redirige al catálogo público
router.get('/', (req, res) => {
  res.redirect('/visitante/index');
});
router.get('/visitante/index', libroController.catalogoPublico);

// ————— Rutas de Libros —————
router.get('/libros', verificarAutenticacion, libroController.listar);
router.get('/libros/crear', verificarAutenticacion, libroController.crearForm);
router.post('/libros', verificarAutenticacion, libroController.crear);
router.get('/libros/:id', verificarAutenticacion, libroController.mostrar);
router.get('/libros/editar/:id', verificarAutenticacion, libroController.editarForm);
router.post('/libros/actualizar/:id', verificarAutenticacion, libroController.actualizar);
router.post('/libros/eliminar/:id', verificarAutenticacion, libroController.eliminar);
router.get('/libros/prestamos', verificarAutenticacion, libroController.mostrarPrestamos);

// ————— Rutas de Préstamos —————
router.get('/prestamos', verificarAutenticacion, prestamoController.mostrarPrestamos);
router.get('/prestamos/crear', verificarAutenticacion, prestamoController.mostrarFormularioCrear);
router.post('/prestamos/crear', verificarAutenticacion, prestamoController.crearPrestamo);
router.post('/prestamos/devolver/:id', verificarAutenticacion, prestamoController.devolverPrestamo);
router.post('/prestamos/eliminar/:id', verificarAutenticacion, prestamoController.eliminarPrestamo);
router.get('/prestamos/editar/:id', verificarAutenticacion, async (req, res) => {
  try {
    const prestamo = await Prestamo.encontrarPorId(req.params.id);
    const libros = await Libro.obtenerTodos();
    const usuarios = await Usuario.obtenerTodos();
    if (!prestamo) return res.status(404).send('Préstamo no encontrado');
    res.render('prestamos/editar', { prestamo, libros, usuarios });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});
router.post('/prestamos/actualizar/:id', verificarAutenticacion, prestamoController.actualizarPrestamo);

// ————— Rutas de Reservas —————
router.get('/reservas', verificarAutenticacion, reservaController.listarReservas);
router.get('/reservas/crear', verificarAutenticacion, reservaController.mostrarFormularioCrear);
router.post('/reservas', verificarAutenticacion, reservaController.crearReserva);
router.get('/reservas/lista', verificarAutenticacion, async (req, res) => {
  try {
    const reservas = await Reserva.obtenerTodas();
    res.render('reservas/lista', { reservas });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});
router.get('/reservas/editar/:id', verificarAutenticacion, reservaController.mostrarFormularioEditar);
router.post('/reservas/actualizar/:id', verificarAutenticacion, reservaController.actualizarReserva);
router.post('/reservas/convertir/:id', verificarAutenticacion, reservaController.convertirEnPrestamo);
router.post('/reservas/eliminar/:id', verificarAutenticacion, reservaController.eliminarReserva);

// ————— Rutas de Usuarios —————
// Login: ahora se usan vistas públicas en "visitante"
router.get('/visitante/login', usuarioController.loginForm);
router.post('/visitante/login', usuarioController.login);
// Logout
router.get('/usuarios/logout', usuarioController.logout);
// Registro: usando la vista en "visitante"
router.get('/visitante/registro', usuarioController.registroForm);
router.post('/visitante/registro', usuarioController.registrarUsuario);
// Ruta privada para usuarios autenticados (vista principal)
router.get('/usuarios/index', isAuthenticated, (req, res) => {
  res.render('usuarios/index', { usuario: req.usuario });
});

// ————— Rutas de Historial de Usuario —————
router.get('/prestamos-usuario', verificarAutenticacion, historialController.mostrarHistorialPrestamosPorUsuario);
router.get('/reservas-usuario', verificarAutenticacion, historialController.mostrarHistorialReservas);

// ————— Rutas de Administrador —————
router.get('/dashboard', verificarAutenticacion, esAdmin, adminController.dashboard);

module.exports = router;
