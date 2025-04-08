// adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

// Ruta para el dashboard de administrador
router.get('/dashboard', isAuthenticated, isAdmin, adminController.dashboard);

// Ruta para listar usuarios (administrador)
router.get('/usuarios', isAuthenticated, isAdmin, adminController.listarUsuarios);

// Ruta para listar libros (administrador)
router.get('/libros', isAuthenticated, isAdmin, adminController.listarLibros);

// Ruta para listar préstamos (administrador)
router.get('/prestamos', isAuthenticated, isAdmin, adminController.listarPrestamos);

module.exports = router;
