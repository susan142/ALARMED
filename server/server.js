//var IPADDRESS="192.168.84.1";
var IPADDRESS="192.168.56.104";
var PORT=9095
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var LOGIN=require('./login.js');

/*
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert')
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/alarmamedica';
*/

////////////////////////////////////////////////////////////////////////////

mongoose.connect('mongodb://localhost/alarmaMedica');

var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
	  console.log("Conexion establecida correctamente con mongoDB");
	});


//////////////////////////////////////////////////////////////////////////
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,x-access-token');
   
    next();
}

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(allowCrossDomain);




var server = app.listen(PORT,IPADDRESS);
console.log('Escuchando en '+IPADDRESS+':'+PORT);
//require('./login')(app);
var LOGIN=require('./login.js');

app.post('/getLogin', function(req, res){	
	
    var data=req.param('data');
    data=JSON.parse(data);
    console.log(data.user);
   	console.log(data.pass);
    
   	
   	LOGIN.getLogin(data.user,data.pass,function(respuesta,mensaje){

	    var msn={};
			msn.data=respuesta;
			msn.status=1;
			msn.message=null;

			if(respuesta < 0){	 
				msn.status=0;
				msn.message={codigo:respuesta,message:mensaje};
			}
		res.json(msn);

	}); 
    
  ////yo he comentado esto
   /* if(data.user == "susan" && data.pass == "susan")
    {
		var user1={}
    	user1.id=1;
	    user1.user="susan";	

		var msn={};
		msn.data=user1;	
		msn.status=1;
		msn.message=null;
	
   }
   else{

	   	var msn={};
		msn.data=null;	
		msn.status=0;
		msn.message="NO AUTENTICADO";
   	} 
	res.json(msn);
  			
	*/
});
//////////////////////////////////////////////////////////
app.post('/getMostrarPastillas',function(req, res){
	
	var pastilla={};
		pastilla.id=1;
		pastilla.nombre='Paracetamol';

	var pastilla1={};
		pastilla1.id=2;
		pastilla1.nombre='Ampicilina';

		var pastilla2={};
		pastilla2.id=3;
		pastilla2.nombre='Amoxicilina';

		var pastilla3={};
		pastilla3.id=4;
		pastilla3.nombre='S:N';

		var pastilla4={};
		pastilla4.id=5;
		pastilla4.nombre='C:O';

		var pastilla5={};
		pastilla5.id=6;
		pastilla5.nombre='N:G';
	
	var lista=[];
		lista[0]=pastilla;
		lista[1]=pastilla1;	
		lista[2]=pastilla2;
		lista[3]=pastilla3;
		lista[4]=pastilla4;
		lista[5]=pastilla5;

	res.json(lista);
});
app.post('/getMostrarReceta',function(req, res){
	var data=req.param('data');
	data=JSON.parse(data);
	console.log(data);
		
		var receta={};
			receta.id1=1
		    receta.NombrePastilla='paracetamol';
		    receta.CantidadPastilla=4;
		    receta.TiempoIntervalo=7;
		    receta.HoraInicio=7;
		    receta.FechaInicio='11/07/15';
		    receta.Nota ='Se debe de tomar cada 7 horas';
		  var lista=[];
		 lista[0]=receta;
		 var msn={};
		 msn.data=lista;
		 msn.status=1;
		 msn.mensage=null;	

  res.json(msn);
});

app.post('/setPastilla',function(req, res){
	
	var data=req.param('data');
    data=JSON.parse(data);
    console.log(data);
	
	// la condicion de data.nota es opcional
	if(data.nombre != "" && data.cantidad != "" && data.tiempo != "" && data.fecha != ""){
       var msn={};
       msn.status=1;
       msn.message='Receta registrada correctamente';		
	}else{
		var msn={};
       	msn.status=0;
       	msn.message='Receta no fue registrada';
	}

 	res.json(msn);
});

app.post('/getAlarma',function(req, res){
	var dato=req.param('data');
	dato=JSON.parse(dato);
	//////
	     var HoraActual=new Date();
	     if(HoraActual.getHours()===(dato.HoraInicio+dato.TiempoIntervalo)){
	     	var msn={};
	     	msn.mensage='DEbe de tomar su pastilla';
	     	msn.status=1;
	     }else{
	     	var msn={};
	     	msn.mensage='Falan '+((dato.HoraInicio+dato.TiempoIntervalo)-HoraActual.getHours()) +" h";
	     	msn.status=0;
	     }
	//////
  res.json(msn);
});