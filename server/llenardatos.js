var mongoose = require('mongoose');
var async=require("async");

mongoose.connect('mongodb://localhost/alarmaMedica',function(){    
    mongoose.connection.db.dropDatabase(function(err,result){
	if(err)console.log(err);
	else{
	   cargarData();	
	}
   });
});

///////////////////////////////////////////////////////////////////////////////////////
var Usuario=require('./modeloDB/usuario.js');
//var Pastilla=require('./modeloDB/pastilla.js');
function cargarData(){
   console.log("Iniciando Carga");
    async.series([
	function(callback){
		var user=new Usuario({user:"susan",password:"susan"});
		user.save(callback);
    var user=new Usuario({user:"lety",password:"lety"});
    user.save(callback);
	}
	], function(err, results){
       if(err){
            console.log("Hubo un error "+err);
        }
        else{
             console.log("Carga Finalizada");
     }
 });
}