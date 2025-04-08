// historialController.js
const Prestamo = require('../database/models/Prestamo');
const Reserva = require('../database/models/Reserva');

exports.mostrarHistorialPrestamos = async (req, res) => {
  try {
    const usuario = req.usuario;
    const prestamos = await Prestamo.find({ usuario: usuario.id }).populate('libro');
    res.render('historial-prestamos', { prestamos });
  } catch (error) {
    console.error(error);
    res.status(500).render('historial-prestamos', { message: 'Error al cargar el historial de préstamos' });
  }
};


exports.mostrarHistorialReservas = async (req, res) => {
  try {
    const { usuario } = req.session;
    const reservas = await Reserva.find({ usuario: usuario._id }).populate('libro');
    res.render('historial-reservas', { reservas });
  } catch (error) {
    console.error(error);
    res.status(500).render('historial-reservas', { message: 'Error al cargar el historial de reservas' });
  }
};

exports.mostrarHistorialPrestamosPorUsuario = async (req, res) => {
  try {
    const { usuario } = req.session;
    const prestamos = await Prestamo.find({ usuario: usuario._id }).populate('libro');
    res.render('historial-prestamos-usuario', { prestamos });
  } catch (error) {
    console.error(error);
    res.status(500).render('historial-prestamos-usuario', { message: 'Error al cargar el historial de préstamos' });
  }
};