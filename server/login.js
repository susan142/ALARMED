var Usuario=require('./modeloDB/usuario.js');
var Pastilla=require('./modeloDB/pastilla.js');

module.exports.getLogin=function(user,password,callback){
	Usuario.find({user:user,password:password}, function(err,data){
		if(data.length===0){
				 	callback(-2,"USUARIO NO AUTENTICADO");
				} 
				else{
				 	data=data[0];
				 	var user={};
						user.id=data._id;
						user.user=data.user;
						user.password=data.password;

					callback(user,null);
				} 
			});
	}
module.exports.setPastilla=function(nombreP,numeroP,tiempoI,fecha_HoraI,notaP,callback){
	var insertarPastilla=new Pastilla({NombrePastilla:nombreP,NumeroPastilla:numeroP,TiempoPastilla:tiempoI,Fecha_HoraInicio:fecha_HoraI,Nota:notaP }, function(err,data){
	insertarPastilla.save();

	   var msn={};
       msn.status=1;
       msn.message='Receta registrada correctamente';
	callback(msn,null);
});
}

module.exports.getMostrarReceta=fuction(nombreP,numeroP,tiempoI,fecha_HoraI,notaP,callback){
	

}
