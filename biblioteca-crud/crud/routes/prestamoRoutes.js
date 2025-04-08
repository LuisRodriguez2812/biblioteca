// prestamoRoutes.js

const express = require('express');
const router = express.Router();
const prestamoController = require('../controllers/prestamoController');
const { isAuthenticated } = require('../middleware/authMiddleware');

// Ruta para listar todos los préstamos
router.get('/', isAuthenticated, prestamoController.mostrarPrestamos);

// Ruta para mostrar los detalles de un préstamo
router.get('/:id', isAuthenticated, prestamoController.mostrarPrestamo);

// Ruta para crear un nuevo préstamo
router.get('/crear', isAuthenticated, prestamoController.mostrarFormularioCrear);
router.post('/crear', isAuthenticated, prestamoController.crearPrestamo);

// Ruta para editar un préstamo
router.get('/:id/editar', isAuthenticated, prestamoController.mostrarFormularioEditar);
router.put('/:id/editar', isAuthenticated, prestamoController.actualizarPrestamo);

// Ruta para devolver un préstamo
router.post('/:id/devolver', isAuthenticated, prestamoController.devolverPrestamo);

// Ruta para eliminar un préstamo
router.delete('/:id', isAuthenticated, prestamoController.eliminarPrestamo);

module.exports = router;
