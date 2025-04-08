-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-04-2025 a las 22:29:58
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `biblioteca`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`, `descripcion`) VALUES
(1, 'Literatura Clásica', NULL),
(2, 'Literatura Juvenil', NULL),
(3, 'Literatura Hispanoamericana', NULL),
(4, 'Fantasía', NULL),
(5, 'Ciencia Ficción', NULL),
(6, 'Misterio y Suspenso', NULL),
(7, 'Biografía', NULL),
(8, 'Historia', NULL),
(9, 'Filosofía', NULL),
(10, 'Psicología', NULL),
(11, 'Romántico', NULL),
(12, 'Aventura', NULL),
(13, 'Terror', NULL),
(14, 'Filosofía Política', NULL),
(15, 'Cultura General', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_actividades`
--

CREATE TABLE `historial_actividades` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `libro_id` int(11) NOT NULL,
  `tipo_accion` enum('reserva','prestamo','devolucion','cancelacion','conversión') NOT NULL,
  `fecha` datetime DEFAULT current_timestamp(),
  `estado_anterior` enum('pendiente','completada','cancelada','activo','devuelto','vencido') DEFAULT NULL,
  `estado_nuevo` enum('pendiente','completada','cancelada','activo','devuelto','vencido') NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE `libros` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `autor` varchar(255) NOT NULL,
  `autores_adicionales` text DEFAULT NULL,
  `categoria_id` int(11) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `stock` int(11) DEFAULT 0,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_publicacion` date DEFAULT NULL,
  `ubicacion_fisica` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`id`, `titulo`, `autor`, `autores_adicionales`, `categoria_id`, `descripcion`, `imagen`, `stock`, `fecha_creacion`, `fecha_publicacion`, `ubicacion_fisica`) VALUES
(64, 'Drácula', 'Bram Stoker', NULL, 1, 'Un clásico de la literatura gótica que relata la historia del Conde Drácula y su intento de mudarse a Inglaterra para extender su vampirismo.', 'dracula.jpg', 10, '2025-04-05 17:24:30', '1897-05-26', 'Estante 1A'),
(65, 'Frankenstein', 'Mary Shelley', NULL, 1, 'La historia de un joven científico, Victor Frankenstein, que crea un monstruo en un intento por desafiar las leyes de la naturaleza.', 'frankenstein.jpg', 8, '2025-04-05 17:24:30', '1818-01-01', 'Estante 1B'),
(66, 'Ojos de mi Princesa 1', 'Carlos Cuauhtémoc Sánchez', NULL, 2, 'Un joven que lucha por conquistar el amor de su compañera de clase en una historia de amor y superación personal.', 'ojos_princesa_1.jpg', 12, '2025-04-05 17:24:30', '2003-07-14', 'Estante 2A'),
(67, 'Ojos de mi Princesa 2', 'Carlos Cuauhtémoc Sánchez', NULL, 2, 'Secuela de la primera parte, donde el protagonista continúa su búsqueda de amor y crecimiento personal.', 'ojos_princesa_2.jpg', 10, '2025-04-05 17:24:30', '2004-08-01', 'Estante 2B'),
(68, 'Paco Yunque', 'César Vallejo', NULL, 3, 'Un niño sufre las consecuencias de una injusticia escolar, un libro sobre la lucha de clases y la discriminación.', 'paco_yunque.jpg', 15, '2025-04-05 17:24:30', '1931-01-01', 'Estante 3A'),
(69, 'Viaje al Oeste', 'Wu Cheng\'en', NULL, 4, 'Una famosa novela de aventuras que cuenta la travesía de un monje y sus tres discípulos para obtener las escrituras budistas.', 'viaje_al_oeste.jpg', 5, '2025-04-05 17:24:30', '1592-01-01', 'Estante 3B'),
(70, 'Harry Potter y la Piedra Filosofal', 'J.K. Rowling', NULL, 4, 'El joven Harry Potter descubre que es un mago y comienza su educación en la escuela de magia Hogwarts.', 'harry_potter_1.jpg', 20, '2025-04-05 17:24:30', '1997-06-26', 'Estante 4A'),
(71, 'El Hobbit', 'J.R.R. Tolkien', NULL, 4, 'Bilbo Bolsón, un hobbit, emprende un gran viaje con un grupo de enanos para recuperar un tesoro robado por el dragón Smaug.', 'el_hobbit.jpg', 18, '2025-04-05 17:24:30', '1937-09-21', 'Estante 4B'),
(72, 'Cien Años de Soledad', 'Gabriel García Márquez', NULL, 3, 'Una obra maestra del realismo mágico que relata la historia de la familia Buendía a lo largo de generaciones en un pueblo ficticio.', 'cien_anos_soledad.jpg', 12, '2025-04-05 17:24:30', '1967-06-05', 'Estante 5A'),
(73, 'Don Quijote de la Mancha', 'Miguel de Cervantes', NULL, 1, 'Las aventuras de un caballero y su fiel escudero que intentan defender la justicia en un mundo que ya no necesita héroes.', 'don_quijote.jpg', 10, '2025-04-05 17:24:30', '1605-01-16', 'Estante 5B'),
(74, '1984', 'George Orwell', NULL, 5, 'Una distopía en la que un gobierno totalitario controla todos los aspectos de la vida, mientras un hombre lucha por la libertad de pensamiento.', '1984.jpg', 8, '2025-04-05 17:24:30', '1949-06-08', 'Estante 6A'),
(75, 'Fahrenheit 451', 'Ray Bradbury', NULL, 5, 'En una sociedad futura, los bomberos queman libros, pero un bombero comienza a cuestionar su propósito y la sociedad en la que vive.', 'fahrenheit_451.jpg', 10, '2025-04-05 17:24:30', '1953-10-19', 'Estante 6B'),
(76, 'El Psicoanalista', 'John Katzenbach', NULL, 6, 'Un psicólogo se ve envuelto en un juego peligroso después de recibir una amenaza de muerte de un misterioso paciente.', 'el_psicoanalista.jpg', 12, '2025-04-05 17:24:30', '2002-10-01', 'Estante 7A'),
(77, 'El Código Da Vinci', 'Dan Brown', NULL, 6, 'Una novela de misterio y suspenso en la que un profesor de simbología descubre una conspiración secreta que se remonta a siglos de historia.', 'codigo_da_vinci.jpg', 15, '2025-04-05 17:24:30', '2003-03-18', 'Estante 7B'),
(78, 'La Sombra del Viento', 'Carlos Ruiz Zafón', NULL, 6, 'Un joven descubre un libro en un cementerio de libros olvidados y se ve arrastrado por un misterio literario de amor, traición y muerte.', 'sombra_viento.jpg', 8, '2025-04-05 17:24:30', '2001-03-13', 'Estante 8A'),
(79, 'El Alquimista', 'Paulo Coelho', NULL, 2, 'La historia de un joven pastor que sigue su sueño de encontrar un tesoro en el desierto, en busca de su leyenda personal.', 'el_alquimista.jpg', 22, '2025-04-05 17:24:30', '1988-11-01', 'Estante 8B'),
(80, 'La Casa de los Espíritus', 'Isabel Allende', NULL, 3, 'Una historia épica de amor, política y fantasía, que sigue la vida de una familia en Chile a lo largo de varias generaciones.', 'casa_espiritus.jpg', 18, '2025-04-05 17:24:30', '1982-05-25', 'Estante 9A'),
(81, 'El Retrato de Dorian Gray', 'Oscar Wilde', NULL, 1, 'Un joven que mantiene su juventud y belleza mientras su retrato envejece y refleja sus pecados.', 'retrato_dorian.jpg', 10, '2025-04-05 17:24:30', '1890-07-01', 'Estante 9B'),
(82, 'Matar a un Ruiseñor', 'Harper Lee', NULL, 7, 'Una obra que explora temas de racismo, justicia y moralidad a través de los ojos de una niña en el sur de Estados Unidos.', 'matar_ruisenor.jpg', 14, '2025-04-05 17:24:30', '1960-07-11', 'Estante 10A'),
(83, 'El Gran Gatsby', 'F. Scott Fitzgerald', NULL, 7, 'La historia de un millonario, su amor no correspondido y los excesos de la sociedad estadounidense en los años 20.', 'gran_gatsby.jpg', 9, '2025-04-05 17:24:30', '1925-04-10', 'Estante 10B');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamos`
--

CREATE TABLE `prestamos` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `libro_id` int(11) NOT NULL,
  `fecha_prestamo` datetime DEFAULT current_timestamp(),
  `fecha_devolucion` date DEFAULT NULL,
  `estado` enum('activo','devuelto','vencido') DEFAULT 'activo',
  `comentarios` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `libro_id` int(11) NOT NULL,
  `fecha_reserva` datetime DEFAULT current_timestamp(),
  `estado` enum('pendiente','completada','cancelada') DEFAULT 'pendiente',
  `comentarios` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `rol` enum('admin','usuario','visitante') DEFAULT 'visitante',
  `activo` tinyint(1) DEFAULT 1,
  `fecha_registro` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `telefono`, `direccion`, `email`, `contrasena`, `rol`, `activo`, `fecha_registro`) VALUES
(1, 'Luis', 'Rodríguez', '966663488', 'Los Sauces 548', 'Luis_rodriguez_120@hotmail.com', 'Goguetassj1', 'admin', 1, '2025-04-05 17:28:09'),
(2, 'Juan', 'Pérez', '987654321', 'Avenida Siempre Viva 456', 'juan_perez@gmail.com', 'Gokuss1', 'usuario', 1, '2025-04-05 17:28:09'),
(3, 'adadadada', 'asasasaas', '987654321', 'jr tu poto 123', 'Pato2121@gmail.com', '$2b$10$1.NdF8XnHdHEBxr6DNHI2esz7Cak/9/j9KCXVizYrdA4zf7XBhCii', 'usuario', 1, '2025-04-06 01:16:13'),
(4, 'saas', 'SADASDADASDSA', '987654333', 'jr mi qlo', 'A19104795@idat.pe', '$2b$10$LE/IyGymTej9sMOKSn8nWuBu9RDDHRNOvCefOXA27ZgIhEZ/s6Mru', 'usuario', 1, '2025-04-06 02:22:40'),
(5, 'asdasd', 'roddom', '987654321', 'jr puno', 'Goku_123@gmail.com', '$2b$10$yUj7S0iwJaMFNp8Gw/R2Ye7zFk8Na/CcvyNRiofkiMgucyksh5x72', 'usuario', 1, '2025-04-06 02:30:26'),
(6, 'aaasdaaadasdada', 'roddomaaaaa', '987654321', 'jr puno123', 'Goku_1235@gmail.com', '$2b$10$Wiq0nhyN9sDdG1W42lwQB.J/J6k3To48hcG5.s9JwMQSFlHFK8ZyC', 'usuario', 1, '2025-04-06 02:32:41'),
(7, 'uwu', 'uwux2q', '4246454', 'San Bartolo', 'aa@gmail.com', '$2b$10$MZX0OgRncMr.sKKrWStoXuZzyAOoglvYYzJS2ZeRxrMtP4tlYfGyy', 'usuario', 1, '2025-04-06 02:33:34'),
(8, 'qqq', 'wwww', '12332123', 'llalalala', 'luis_alvarez_123@hotmail.com', '$2b$10$a5KbnTUHuae3Okdq7GN3yuH2lVMJxUDppMjVwCJuegcsRtAwqbC/a', 'usuario', 1, '2025-04-06 02:52:00'),
(9, 'hola hola', 'aña', '963852741', 'pooso', 'auwu@gmail.com', '$2b$10$7AuZGDXl/xteuBuYFxZq5epo3mUN4uD2Asbl2W2S0ozLwIXxC2v3C', 'usuario', 1, '2025-04-06 02:55:39'),
(10, 'aaaaaaaaaaaa', 'aaaaaaaaaaaaaaaa', '122222222222', 'assssaaaaa', 'asadasd@125gmail.com', '$2b$10$dzP5JG4jpiWKATXlBzCXHOQEqMyMs6kERezvYF0CTvUftkq0LURg2', 'usuario', 1, '2025-04-06 03:05:59'),
(11, 'adadadadaaas', 'roddomaaa', '9876543211', 'jr tu poto 123a', 'Pato2121aa@gmail.com', '$2b$10$tGCrIumePfjuSnuOteUbOO0SSrfjdGCQiGg1PENyIGPR0S4H1EMeu', 'usuario', 1, '2025-04-06 03:06:39'),
(12, 'sadadadsdsa', 'aaaaaaaaqqq', '1231232113', 'qweqwewqewqe', 'Patolud2121@gmail.com', '$2b$10$FTCY1yb06xxijr.jTYJzruj8etnE.7iGCn4b.tOwjgkF.leIuekc.', 'usuario', 1, '2025-04-06 03:10:49'),
(13, 'aaaasqq', 'qwwq12', '741852963', 'asdasdasaa', 'Patosss2121@gmail.com', '$2b$10$lz5EkksTNNs3mfpmjAic5O3nuVIAiKWWFfujxQ.gGZ414XaR5auh6', 'usuario', 1, '2025-04-06 03:13:03'),
(14, 'sadasdsadasd', 'asdadasdsaaaa', '1231231231', 'asdaaaqqee', 'luis_alvarez_1223@hotmail.com', '$2b$10$JMl7RhRyOaN7XNFvL8gSfeuomEuaJIwGztWpUFvJPt6BZpcBuVlnC', 'usuario', 1, '2025-04-06 03:15:54'),
(15, 'asdasda', 'aaaaaaaaaaaaaqw', '346773434', 'jr tu poto 123ssa', 'Pato21121221@gmail.com', '$2b$10$MTsIV5LlQdM/swevn64twOuJ4bouKjEuY/SSkJxYb/rMPpfw.pwcq', 'usuario', 1, '2025-04-06 03:37:32'),
(16, 'assada', 'aaaaaqq1', '2323112123', 'asdsa', 'Patoaaaa2121@gmail.com', '$2b$10$V5ehVu.bFPbUkO/IZwdjb.brPkAGb7grVEFVOfKCE2SjDJFtpl9.q', 'usuario', 1, '2025-04-06 15:44:26'),
(17, 'Luis', 'Alvarez', '966663488', 'Jr villareal 266', 'luis_rodriguez_130@hotmail.com', '$2b$10$zGRr6OCyyEoISfyFRFtuXuUT6niFeIgMl4YpTryQwK4BQz63Nq0/6', 'usuario', 1, '2025-04-07 01:30:34'),
(18, 'luis', 'rodriguez', '966663488', 'Jr villareal 266', 'luis_alvarez_2000@hotmail.com', '$2b$10$DoAvSkpm4/5Qeh.aRjj0Dulf4X9/iBhycBBTe/DjdB2ILt2xxSqca', 'usuario', 1, '2025-04-07 01:35:28'),
(19, 'rodrigo', 'vergara', '741852963', 'j troncha', 'luffy_123@gmail.com', '$2b$10$VrktcPzC9UqBKmbv8i.32OvAQd31He4yg4D.WZwu5CxcR6cSuOfGS', 'usuario', 1, '2025-04-07 01:58:42');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `historial_actividades`
--
ALTER TABLE `historial_actividades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `libro_id` (`libro_id`);

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indices de la tabla `prestamos`
--
ALTER TABLE `prestamos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `libro_id` (`libro_id`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `libro_id` (`libro_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `historial_actividades`
--
ALTER TABLE `historial_actividades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT de la tabla `prestamos`
--
ALTER TABLE `prestamos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `historial_actividades`
--
ALTER TABLE `historial_actividades`
  ADD CONSTRAINT `historial_actividades_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `historial_actividades_ibfk_2` FOREIGN KEY (`libro_id`) REFERENCES `libros` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `libros`
--
ALTER TABLE `libros`
  ADD CONSTRAINT `libros_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`);

--
-- Filtros para la tabla `prestamos`
--
ALTER TABLE `prestamos`
  ADD CONSTRAINT `prestamos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `prestamos_ibfk_2` FOREIGN KEY (`libro_id`) REFERENCES `libros` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`libro_id`) REFERENCES `libros` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
