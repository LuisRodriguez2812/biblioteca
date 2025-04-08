const Usuario = require('../models/Usuario');

exports.mostrarFormularioLogin = (req, res) => {
  res.render('visitante/login', { message: null });
};

exports.procesarLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por email
    const usuario = await Usuario.findOne({ email });

    // Verificar si el usuario no existe o la contraseña no coincide
    if (!usuario || !(await usuario.compararPassword(password))) {
      return res.render('visitante/login', { message: 'Credenciales inválidas' });
    }

    // Iniciar sesión del usuario (guardar en la sesión)
    req.session.usuario = usuario;  // Guardamos el usuario en la sesión

    // Redirigir a /usuarios/index después de un login exitoso
    res.redirect('/usuarios/index');
  } catch (error) {
    console.error(error);
    res.status(500).render('visitante/login', { message: 'Error al iniciar sesión' });
  }
};
