const Reserva = require('../database/models/Reserva');
const Libro = require('../database/models/Libro');

// Listar todas las reservas
exports.listarReservas = async (req, res) => {
  try {
    const reservas = await Reserva.obtenerTodas();
    res.render('reservas/lista', { 
      reservas, 
      success: req.flash('success'), 
      error: req.flash('error') 
    });
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    res.status(500).render('error', { message: 'Error al obtener las reservas' });
  }
};

// Mostrar formulario para crear una reserva
exports.mostrarFormularioCrear = async (req, res) => {
  try {
    const libros = await Libro.listar();
    const personas = await Persona.listar();
    res.render('reservas/crear', { libros, personas, error: req.flash('error') });
  } catch (error) {
    console.error('Error al mostrar el formulario:', error);
    res.status(500).render('error', { message: 'Error al cargar el formulario de reserva' });
  }
};

// Crear una nueva reserva
exports.crearReserva = async (req, res) => {
  try {
    // Verifica si el usuario está autenticado
    if (!req.session.user) {
      req.flash('error', 'Debes estar autenticado para crear una reserva.');
      return res.redirect('/reservas/crear');
    }

    const { libroId, fecha_inicio } = req.body;

    const libro = await Libro.encontrarPorId(libroId);
    if (!libro || libro.estado !== 'disponible') {
      req.flash('error', 'El libro no está disponible.');
      return res.redirect('/reservas/crear');
    }

    // Usamos req.session.user.id para obtener el usuario autenticado
    await Reserva.crear({
      libro_id: libro.id,
      persona_id: req.session.user.id,  // Usamos el usuario de la sesión
      fecha_inicio: fecha_inicio || null
    });

    await Libro.actualizar(libro.id, { estado: 'reservado' });

    req.flash('success', 'Reserva creada exitosamente');
    res.redirect('/reservas');
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    req.flash('error', 'Error al crear la reserva');
    res.redirect('/reservas/crear');
  }
};


// Mostrar formulario para editar reserva
exports.mostrarFormularioEditar = async (req, res) => {
  try {
    const reserva = await Reserva.encontrarPorId(req.params.id);
    const libros = await Libro.listar();
    const personas = await Persona.listar();

    if (!reserva) {
      req.flash('error', 'Reserva no encontrada');
      return res.redirect('/reservas');
    }

    res.render('reservas/editar', { reserva, libros, personas, error: req.flash('error') });
  } catch (error) {
    console.error('Error al editar reserva:', error);
    res.status(500).render('error', { message: 'Error al cargar el formulario de edición' });
  }
};

// Actualizar una reserva
exports.actualizarReserva = async (req, res) => {
  try {
    const { libroId, personaId, fecha_inicio } = req.body;
    await Reserva.actualizar(req.params.id, {
      libro_id: libroId,
      persona_id: personaId,
      fecha_inicio: fecha_inicio || null
    });

    req.flash('success', 'Reserva actualizada correctamente');
    res.redirect('/reservas');
  } catch (error) {
    console.error('Error al actualizar la reserva:', error);
    req.flash('error', 'Error al actualizar la reserva');
    res.redirect('/reservas');
  }
};

// Eliminar una reserva
exports.eliminarReserva = async (req, res) => {
  try {
    await Reserva.eliminar(req.params.id);
    req.flash('success', 'Reserva eliminada correctamente');
    res.redirect('/reservas');
  } catch (error) {
    console.error('Error al eliminar reserva:', error);
    req.flash('error', 'Error al eliminar la reserva');
    res.redirect('/reservas');
  }
};

// Convertir una reserva en préstamo
exports.convertirEnPrestamo = async (req, res) => {
  try {
    await Reserva.convertirAPrestamo(req.params.id);
    req.flash('success', 'Reserva convertida en préstamo correctamente');
    res.redirect('/prestamos');
  } catch (error) {
    console.error('Error al convertir la reserva:', error);
    req.flash('error', 'Error al convertir la reserva en préstamo');
    res.redirect('/reservas');
  }
};
