USE queveo;

CREATE TABLE `actor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(70) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `actor_pelicula` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `actor_id` int(11) NOT NULL,
  `pelicula_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`pelicula_id`) REFERENCES `pelicula` (`id`),
  FOREIGN KEY (`actor_id`) REFERENCES `actor` (`id`)
);