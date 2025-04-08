const jwt = require('jsonwebtoken');

exports.isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/visitante/login');
  }
  jwt.verify(token, process.env.JWT_SECRET || 'secret_key', (err, decoded) => {
    if (err) {
      console.error('Error al verificar token:', err);
      return res.redirect('/visitante/login');
    }
    // Guardamos el usuario en req.usuario (sin usar session)
    req.usuario = decoded;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  // Ahora usamos req.usuario (no req.session.usuario)
  if (req.usuario && req.usuario.rol === 'admin') {
    return next();
  }
  res.status(403).send('Acceso denegado');
};
