// libroRoutes.js

const express = require('express');
const router = express.Router();
const libroController = require('../controllers/libroController');
const { isAuthenticated } = require('../middleware/authMiddleware');

// Ruta para listar todos los libros
router.get('/', isAuthenticated, libroController.listarLibros);

// Ruta para mostrar los detalles de un libro
router.get('/:id', isAuthenticated, libroController.mostrarLibro);

// Ruta para crear un nuevo libro
router.get('/crear', isAuthenticated, libroController.crearLibroForm);
router.post('/crear', isAuthenticated, libroController.crearLibro);

// Ruta para editar un libro
router.get('/:id/editar', isAuthenticated, libroController.editarLibroForm);
router.put('/:id/editar', isAuthenticated, libroController.editarLibro);

// Ruta para eliminar un libro
router.delete('/:id', isAuthenticated, libroController.eliminarLibro);

module.exports = router;
