var IPADDRESS="192.168.56.1";
var PORT=9095
var express = require('express');
var bodyParser = require('body-parser');

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

app.post('/getLogin', function(req, res){	
	
    	var data=req.param('data');
       data=JSON.parse(data);
    	
    if(data.user === "susan" || data.pass ==="susan"){

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
	
});
//////////////////////////////////////////////////////////
app.post('/getMostrarPastillas',function(req, res){
	var data=req.param('data');
	data=JSON.parse(data);
	if(data.user=='susan'){
		
		var receta={};
			receta.id=1
		    receta.NombrePastilla='paracetamol';
		  var lista=[];
		 lista[0]=receta;
		 var msn={};
		 msn.data=lista;
		 msn.status=1;
		 msn.mensage='autenticado';
	}else{
		var msn={};
		msn.data=null;
		msn.status=0;
		msn.mensage='no autenticado';		
	}

  res.json(msn);
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
		    receta.Nota='Se debe de tomar cada 7 horas';
		  var lista=[];
		 lista[0]=receta;
		 var msn={};
		 msn.data=lista;
		 msn.status=1;
		 msn.mensage=null;	

  res.json(msn);
});
app.post('/getGuardarReceta',function(req, res){
	var dato=req.param('data');
	dato=JSON.parse(dato);
	if(dato.NombrePastilla!==null&&dato.Cantidad!==null&&dato.TiempoItervalo!==null&&dato.HoraInicio!==null&&dato.FechaInicio!==null&&dato.Nota!==null){
       var msn={};
       msn.status=1;
       msn.mensage='receta registrada correctamente';		
	}else{
		 var msn={};
       msn.status=0;
       msn.mensage='receta no fue registrada';
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


