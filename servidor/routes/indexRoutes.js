const express = require('express');
let controller = require('../controller/indexController')
let app = express.Router(controller)

app.get('/', controller.getAll)
app.get('/peliculas', controller.cargarPeliculas);
app.get('/generos', controller.cargarGeneros);
app.get('/peliculas/recomendacion', controller.recomendacionPeliculas);
app.get('/peliculas/:id', controller.informacionPelicula);

module.exports = app;
