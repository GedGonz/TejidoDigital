var express = require('express');
var mongoose= require('mongoose');/*Importamos la libreria mongodb*/
var router = express.Router();
var multer = require('multer');
var cloudinary = require('cloudinary');
var nameimage="";

cloudinary.config({ 
  cloud_name: 'gedgonz', 
  api_key: '817862158519284', 
  api_secret: 'Yi7Usj78XdZhcpnHzwquG9fvt3E' 
});

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
     var tipo=file.mimetype;
 if(tipo=='image/png' || tipo=='image/jpg' || tipo=='image/jpeg')
 {
  /*console.log(file.originalname);*/
    callback(null, './public/uploads/');
 }

     
    
  },
  filename: function (req, file, callback) {
      nameimage=file;
    callback(null, file.originalname);
  }
});

//var upload = multer({ storage : storage}).single('image');


/*Coneccion a Monogodb*/
//mongodb://ged:gedgonz791@ds015478.mongolab.com:15478/tejido
mongoose.connect("mongodb://ged:gedgonz791@ds015478.mlab.com:15478/tejido");

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
router.post('/servicios/save',multer({ storage : storage}).single('image'),function(req, res, next) {
 
var datass="./public/uploads/"+nameimage.originalname;
cloudinary.uploader.upload(datass, function(result) { 

  console.log(datass) 
  var data=
  {
  Titulo:req.body.titulo,
  Descripcion:req.body.descripcion,
  ImageUrl:result.url,
  Precio:req.body.precio
  }
  //console.log(nameimage);

  var Tecno=new Tecnologias(data);
  Tecno.save(function(err)
  {
    console.log(Tecno);
  });

  res.render('index');

})


  
/*


*/

});




module.exports = router;
