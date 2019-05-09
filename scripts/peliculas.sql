CREATE DATABASE queveo;

USE queveo;

CREATE TABLE `pelicula` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) NOT NULL,
  `duracion` int(5) NOT NULL,
  `director` varchar(400) NOT NULL,
  `anio` int(5) NOT NULL,
  `fecha_lanzamiento` date NOT NULL,
  `puntuacion` int(2) NOT NULL,
  `poster` varchar(300) NOT NULL,
  `trama` varchar(700) NOT NULL,
  PRIMARY KEY (`id`)
);