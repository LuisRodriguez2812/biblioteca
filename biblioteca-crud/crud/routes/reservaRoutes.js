// reservaRoutes.js

const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const { isAuthenticated } = require('../middleware/authMiddleware');

// Ruta para listar todas las reservas
router.get('/', isAuthenticated, reservaController.listarReservas);

// Ruta para mostrar los detalles de una reserva
router.get('/:id', isAuthenticated, reservaController.mostrarReserva);

// Ruta para crear una nueva reserva
router.get('/crear', isAuthenticated, reservaController.mostrarFormularioCrear);
router.post('/crear', isAuthenticated, reservaController.crearReserva);

// Ruta para editar una reserva
router.get('/:id/editar', isAuthenticated, reservaController.mostrarFormularioEditar);
router.put('/:id/editar', isAuthenticated, reservaController.actualizarReserva);

// Ruta para cancelar una reserva
router.delete('/:id', isAuthenticated, reservaController.eliminarReserva);

module.exports = router;
