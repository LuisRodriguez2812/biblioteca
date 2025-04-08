// historialRoutes.js
const express = require('express');
const router = express.Router();
const historialController = require('../controllers/historialController');

// Ruta para mostrar el historial de préstamos del usuario
router.get('/prestamos-usuario', historialController.mostrarHistorialPrestamosPorUsuario);

// Ruta para mostrar el historial de reservas del usuario
router.get('/reservas', historialController.mostrarHistorialReservas);

module.exports = router;
