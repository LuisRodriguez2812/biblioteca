const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

exports.procesarRegistro = async (req, res) => {
  const { nombre, apellido, email, password } = req.body;

  try {
    const existeUsuario = await Usuario.findOne({ email });

    if (existeUsuario) {
      return res.render('visitante/registro', { error: 'El usuario ya existe' });
    }

    const nuevoUsuario = new Usuario({ nombre, apellido, email, password });
    await nuevoUsuario.save();

    // Generar el token JWT
    const token = jwt.sign(
      {
        id: nuevoUsuario._id,
        email: nuevoUsuario.email,
        nombre: nuevoUsuario.nombre,
        apellido: nuevoUsuario.apellido || '',
        rol: 'usuario'
      },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '1h' }
    );

    // Enviar token al navegador
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    // Redirigir a la vista protegida
    res.redirect('/usuarios/index');

  } catch (error) {
    console.error('Error en el registro:', error);
    res.render('visitante/registro', { error: 'Error al registrar el usuario' });
  }
};
