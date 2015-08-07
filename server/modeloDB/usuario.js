var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var SchemaPastilla=new Schema({
	NombrePastilla:String,
	NumeroPastilla:Number, 
	TiempoIntervalo=String,
	Fecha_HoraInicio: Date,
	Nota:String
});

var SchemaUsuario = new Schema({
  user:  String,
  password: String,
  pastilla:[schemaPastilla]
});

module.exports = mongoose.model('Usuario',SchemausUario);