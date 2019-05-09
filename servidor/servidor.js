//paquetes necesarios para el proyecto
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

const indexRoutes = require('./routes/indexRoutes');
app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(indexRoutes);

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});