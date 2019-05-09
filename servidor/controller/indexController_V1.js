var con = require('../lib/conexionbd');

// GET ALL
function getAll (req, res) {
   console.log('estoy en controller')
   res.send('hola todos')
}

function cargarPeliculas(req, res){ 
    var reciboQuery = crearParamentros(req.query);
    var total;  
    var sqlCount = 'SELECT COUNT(*) FROM pelicula';
    var sql = 'SELECT * FROM pelicula';

    // ARMO LA CONSULTA CON FILTROS
    if (reciboQuery.where !== '') {
        sql = sql + ' WHERE ' + reciboQuery.where;
        sqlCount = sqlCount + ' WHERE ' + reciboQuery.where;
    }

    // AGREGO ORDER BY
    if (reciboQuery.order !== undefined) {
        sql =  sql + reciboQuery.order;
    } 

    con.query(sqlCount, function(error, resultado){  
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        total = Object.values(resultado[0]);
    });
    
    sql = sql + ' LIMIT ' + (req.query.pagina*20) + ', 20 '

    con.query(sql, function(error, resultado, fields) {  
    if (error) {
        console.log("Hubo un error en la consulta", error.message);
        return res.status(404).send("Hubo un error en la consulta");
    }

    var respuesta = {
        'peliculas': resultado,
        'total': parseInt(total),
    };
    
    res.send(JSON.stringify(respuesta));
  });
   
}

function crearParamentros(params) {
    console.log('Recibo estos parametros',params)
    var queryparams = [];
    var queryOrder;
 
    if (typeof params.titulo !== 'undefined') {
        queryparams.push("titulo LIKE " + "'%" + params.titulo + "%'");
    }
  
    if (typeof params.genero !== 'undefined') {
        queryparams.push("genero_id =" + params.genero);
    }

    if (typeof params.anio !== 'undefined') {
        queryparams.push("anio =" + params.anio);
    }

    if (params.columna_orden !== 'titulo') {
        queryOrder = " ORDER BY " + params.columna_orden + " " + params.tipo_orden
    }

    return {
      where: queryparams.join(' AND '),
      order:queryOrder,
    };
  }

function cargarGeneros(req, res){
   var sql = "SELECT * from genero";

   con.query(sql, function(error, resultado, fields) {
     if (error) {
          console.log("Hubo un error en la consulta", error.message);
          return res.status(404).send("Hubo un error en la consulta");
      }
      var respuesta = {
          'generos': resultado
      };
      res.send(JSON.stringify(respuesta));
  });
   
}

function informacionPelicula(req, res){
    var pelicula = "SELECT * FROM pelicula WHERE pelicula.id = "  + req.params.id;
    var genero = "SELECT genero.nombre FROM pelicula JOIN genero ON genero.id = pelicula.genero_id WHERE pelicula.id = "  + req.params.id;
    var actores = "SELECT actor.nombre FROM pelicula JOIN actor_pelicula on actor_pelicula.pelicula_id = pelicula.id JOIN actor on actor_pelicula.actor_id = actor.id WHERE pelicula.id = "  + req.params.id;
    
    con.query(pelicula, function(error, resultadopelicula, fields) {
        if (error) {
             console.log("Hubo un error en la consulta", error.message);
             return res.status(404).send("Hubo un error en la consulta");
         }

        con.query(genero, function(error, resultadogenero, fields){
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }
            
        var respuesta = {
                'pelicula': resultadopelicula,
                'genero': resultadogenero
        }});

         console.log(resultadopelicula,resultadogenero)
         res.send(JSON.stringify(respuesta));
    });
}

module.exports = {
   getAll : getAll,
   cargarPeliculas : cargarPeliculas,
   cargarGeneros : cargarGeneros,
   informacionPelicula : informacionPelicula
}