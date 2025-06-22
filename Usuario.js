const mongoose = require('mongoose');

//por el momento como estoy testeando solo tengo la mitad del json, ojo ahi
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  correo: { type: String, unique: true },
  password: String
});

module.exports = mongoose.model('Usuario', usuarioSchema);