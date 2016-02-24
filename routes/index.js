var express = require('express');
var mongoose= require('mongoose');/*Importamos la libreria mongodb*/
var router = express.Router();

/*Coneccion a Monogodb*/
mongoose.connect("mongodb://localhost/tejido");

//Definir nuestro esquema de la Tabla Tencnologias
var TecnoSchema=
{
	Titulo:String,
	Descripcion:String,
	ImageUrl:String,
	Precio:Number
};

var Tecnologias=mongoose.model('Tecnologias',TecnoSchema);
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

router.get('/servicios', function(req, res, next) {
  res.render('services/servicios', { title: 'Express' });
});

router.get('/servicios/new', function(req, res, next) {
  res.render('services/new', { title: 'Express' });
});

router.post('/servicios/save', function(req, res, next) {
 
  var data=
  {
  Titulo:req.body.titulo,
  Descripcion:req.body.descripcion,
  ImageUrl:req.body.image,
  Precio:req.body.precio
  }
  var Tecno=new Tecnologias(data);
  Tecno.save(function(err)
  {
    console.log(Tecno);
  })

  
  res.render('index', { title: 'Express' });
});




module.exports = router;
