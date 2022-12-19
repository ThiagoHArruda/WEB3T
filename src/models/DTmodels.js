const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//DT Schema
const DTSchema = new Schema({
    title: {
      type: String,
      required: [true, '*Campo obrigatório']
    },
    image: {
      type: String,
      required: [true, '*Campo obrigatório']
    }
  })
  // criar Modelo_PI baseado em PISchema: ‘PontosInteresse’->nome da // coleção
  const DT = mongoose.model('DataContent', DTSchema);
  // exportar Modelo_PI
  module.exports = DT;