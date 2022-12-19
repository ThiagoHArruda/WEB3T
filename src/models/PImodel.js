const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// PI Schema
const PISchema = new Schema({
  user: {
  type: String,
  required: [true, '*Campo obrigatório!']
  },
  password: {
  type: String,
  required: [true, '*Campo obrigatório!']
  }
});
// criar Modelo_PI baseado em PISchema: ‘PontosInteresse’->nome da // coleção
const PI = mongoose.model('PontosInteresse', PISchema);

// exportar Modelo_PI
module.exports = PI;
