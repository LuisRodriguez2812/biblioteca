const Libro = require('../database/models/Libro');
const Categoria = require('../database/models/Categoria');

// 📚 Listar todos los libros (solo admins o usuarios autenticados)
exports.listar = async (req, res) => {
  try {
    const libros = await Libro.listar();
    res.render('libros/listar', { libros });
  } catch (error) {
    console.error('Error al listar libros:', error);
    res.status(500).send('Error al obtener la lista de libros');
  }
};

// 📝 Mostrar formulario de creación
exports.crearForm = async (req, res) => {
  try {
    const categorias = await Categoria.listar();
    res.render('libros/crear', { categorias });
  } catch (error) {
    console.error('Error al cargar formulario de creación:', error);
    res.status(500).send('Error al cargar el formulario');
  }
};

// 📌 Crear un nuevo libro
exports.crear = async (req, res) => {
  try {
    const { titulo, autor, ISBN, estado, categoriaId, stock } = req.body;
    await Libro.crear(titulo, autor, ISBN, estado || 'disponible', categoriaId, stock || 1);
    res.redirect('/libros');
  } catch (error) {
    console.error('Error al crear libro:', error);
    res.status(500).send('Error al crear el libro');
  }
};

// 🔍 Mostrar detalles de un libro
exports.mostrar = async (req, res) => {
  try {
    const libro = await Libro.encontrarPorId(req.params.id);
    if (!libro) return res.status(404).send('Libro no encontrado');
    res.render('libros/mostrar', { libro });
  } catch (error) {
    console.error('Error al mostrar libro:', error);
    res.status(500).send('Error al obtener el libro');
  }
};

// 🛠 Mostrar formulario de edición
exports.editarForm = async (req, res) => {
  try {
    const libro = await Libro.encontrarPorId(req.params.id);
    const categorias = await Categoria.listar();
    if (!libro) return res.status(404).send('Libro no encontrado');
    res.render('libros/editar', { libro, categorias });
  } catch (error) {
    console.error('Error al cargar formulario de edición:', error);
    res.status(500).send('Error al cargar el formulario de edición');
  }
};

// 🔄 Actualizar libro
exports.actualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, autor, ISBN, estado, categoriaId, stock } = req.body;

    await Libro.actualizar(id, {
      titulo,
      autor,
      ISBN,
      estado,
      categoria_id: categoriaId || null,
      stock: stock || 1
    });

    res.redirect(`/libros/${id}`);
  } catch (error) {
    console.error('Error al actualizar libro:', error);
    const libro = await Libro.encontrarPorId(req.params.id);
    res.render('libros/editar', {
      libro,
      error: 'Error al actualizar el libro'
    });
  }
};

// 🗑️ Eliminar libro
exports.eliminar = async (req, res) => {
  try {
    await Libro.eliminar(req.params.id);
    res.redirect('/libros');
  } catch (error) {
    console.error('Error al eliminar libro:', error);
    res.status(500).send('Error al eliminar el libro');
  }
};

// 📋 Mostrar lista de préstamos
exports.mostrarPrestamos = async (req, res) => {
  try {
    const librosPrestados = await Libro.listarPrestamos();
    res.render('libros/prestamos', { libros: librosPrestados });
  } catch (error) {
    console.error('Error al obtener los préstamos:', error);
    res.status(500).send('Error al cargar los préstamos');
  }
};

// 🌐 Vista pública para visitantes (portada con catálogo)
exports.catalogoPublico = async (req, res) => {
  try {
    const libros = await Libro.listar(); // ✅ Asegúrate que cada libro tenga: id, titulo, autor, ISBN, estado, stock
    res.render('visitante/index', { libros });
  } catch (error) {
    console.error('Error al cargar catálogo público:', error);
    res.status(500).send('Error al mostrar los libros al visitante');
  }
};
