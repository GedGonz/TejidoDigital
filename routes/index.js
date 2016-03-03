var express = require('express');
var mongoose= require('mongoose');/*Importamos la libreria mongodb*/
var router = express.Router();
var cloudinary = require('cloudinary');
var multer= require('multer');
var app=express();

//pp.use(multer({dest:"./uploads"}).single("image"));

var upload = multer({dest:'./uploads'});

var cpUpload = upload.single('image');

cloudinary.config({ 
  cloud_name: 'gedgonz', 
  api_key: '817862158519284', 
  api_secret: 'Yi7Usj78XdZhcpnHzwquG9fvt3E' 
});

//var upload = multer({ storage : storage}).single('image');


/*Coneccion a Monogodb*/
//mongodb://ged:gedgonz791@ds015478.mongolab.com:15478/tejido
mongoose.connect("mongodb://ged:gedgonz791@ds015478.mongolab.com:15478/tejido");

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

  Tecnologias.find(function(err,data){
    console.log(data)
    res.render('services/servicios', { datas: data });
  })
  
});

router.get('/servicios/new', function(req, res, next) {
  res.render('services/new', { title: 'Express' });
});
//var fs=require('fs');
router.post('/servicios/save',cpUpload,function(req, res, next) {
 




  var data=
  {
  Titulo:req.body.titulo,
  Descripcion:req.body.descripcion,
  ImageUrl:"image.png",
  Precio:req.body.precio
  }


  var Tecno=new Tecnologias(req.file);
  console.log(req.file);
  /*Tecno.save(function(err)
  {
    console.log(Tecno);
  })*/


  res.render('index');
});




module.exports = router;
