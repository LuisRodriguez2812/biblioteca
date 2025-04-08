const Usuario = require('../database/models/Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Formulario de Login
exports.loginForm = (req, res) => {
  //console.log('Accediendo al formulario de login');
  res.render('visitante/login', { error: null }); // asegurate de pasar "error"
};

// Procesar Login
exports.login = async (req, res) => {
  try {
    const { email, contrasena } = req.body;

    // 1. Buscar usuario por email
    const usuario = await Usuario.encontrarPorEmail(email);
    if (!usuario) {
      return res.render('visitante/login', { error: 'Credenciales inválidas' });
    }

    // 2. Verificar la contraseña usando bcrypt.compare
    const isPasswordCorrect = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!isPasswordCorrect) {
      return res.render('visitante/login', { error: 'Credenciales inválidas' });
    }

    // 3. Crear token JWT (incluyendo rol)
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rol: usuario.rol, nombre: usuario.nombre, apellido: usuario.apellido },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '1h' }
    );

    // 4. Establecer cookie con el token
    res.cookie('token', token, { httpOnly: true });

    // Guardar los datos del usuario en la sesión
   // req.session.usuario = usuario;

    // Redirigir a /usuarios/index después de login exitoso
    res.redirect('/usuarios/index');
  } catch (error) {
    console.error('Error en login:', error);
    res.render('visitante/login', { error: 'Error en el servidor' });
  }
};



// Formulario de registro (usando vista de registro en "visitante")
exports.registroForm = (req, res) => {
  res.render('visitante/registro', { error: null });
};

// Registrar nuevo usuario
exports.registrarUsuario = async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, direccion, contrasena } = req.body;

    // Validaciones básicas
    if (!nombre || !apellido || !email || !telefono || !direccion || !contrasena) {
      return res.render('visitante/registro', {
        error: 'Todos los campos son obligatorios'
      });
    }

    // Verificar si el correo ya está registrado
    const existingUser = await Usuario.encontrarPorEmail(email);
    if (existingUser) {
      return res.render('visitante/registro', {
        error: 'El correo electrónico ya está registrado.'
      });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Crear nuevo usuario
    const nuevoUsuario = {
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      contrasena: hashedPassword,
      rol: 'usuario' // Por defecto
    };

    await Usuario.crear(nuevoUsuario);

    // Autenticar al usuario automáticamente (opcional)
    const token = jwt.sign(
      { id: nuevoUsuario.id, email: nuevoUsuario.email, rol: nuevoUsuario.rol },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '1h' }
    );

    res.cookie('token', token, { httpOnly: true });
    res.redirect('/usuarios/index');

    // Redirigir a vista principal del usuario
    res.redirect('/usuarios/index');
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.render('visitante/registro', { error: 'Error en el servidor al registrar' });
  }
};

// Cerrar sesión y redirigir a la página de login
exports.logout = (req, res) => {
  res.clearCookie('token');
  // Eliminamos cualquier referencia a session.destroy
  res.redirect('/visitante/login');
};
