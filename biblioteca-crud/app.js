const express        = require('express');
const path           = require('path');
const session        = require('express-session');
const helmet         = require('helmet');
const flash          = require('connect-flash');
const methodOverride = require('method-override');
const cookieParser   = require('cookie-parser');  // Importa cookie-parser
require('dotenv').config();

const app = express();

// 🔒 Seguridad
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"]
    }
  },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }
}));

// 🖥️ Vistas (están en /crud/views)
app.set('views', path.join(__dirname, 'crud', 'views'));
app.set('view engine', 'ejs');

// 📦 Formularios y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// 📂 Archivos estáticos (están en /crud/public)
app.use(express.static(path.join(__dirname, 'crud', 'public')));

// 🔐 Sesiones y flash
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret-key',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error   = req.flash('error');
  next();
});

// 🍪 Manejo de cookies
app.use(cookieParser());  // Agregar cookie-parser aquí

// 🚀 Rutas: router.js está en la raíz
const router = require('./router');
app.use('/', router);

// ⚠️ Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// 🚀 Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
