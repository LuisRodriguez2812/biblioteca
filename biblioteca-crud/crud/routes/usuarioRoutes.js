const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { isAuthenticated } = require('../middleware/authMiddleware');


// Ruta de inicio de sesión
router.get('/login', usuarioController.loginForm);
router.post('/login', usuarioController.login);

// Ruta para registro de nuevo usuario
router.get('/registrar', usuarioController.registroForm);
router.post('/registrar', usuarioController.registrarUsuario);

// Ruta de cierre de sesión
router.get('/logout', usuarioController.logout);

// Ruta de la vista principal de usuario después de login
router.get('/index', isAuthenticated, usuarioController.index);



// Ruta para listar todos los usuarios
router.get('/', isAuthenticated, usuarioController.listarUsuarios);

// Ruta para mostrar los detalles de un usuario
router.get('/:id', isAuthenticated, usuarioController.mostrarUsuario);


module.exports = router;
