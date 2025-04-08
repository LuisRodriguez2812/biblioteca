// routes.js
const express = require('express');
const router = express.Router();

// Importar los archivos de ruta individuales
const adminRoutes = require('./adminRoutes');
const libroRoutes = require('./libroRoutes');
const prestamoRoutes = require('./prestamoRoutes');
const reservaRoutes = require('./reservaRoutes');
const usuarioRoutes = require('./usuarioRoutes');

// Montar las rutas individuales
router.use('/admin', adminRoutes);
router.use('/libros', libroRoutes);
router.use('/prestamos', prestamoRoutes); 
router.use('/reservas', reservaRoutes);
router.use('/usuarios', usuarioRoutes);


module.exports = router;
