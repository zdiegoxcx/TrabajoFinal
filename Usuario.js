const mongoose = require('mongoose');

// Esquema para las tareas
const tareaSchema = new mongoose.Schema({
  id: Number,
  fecha: String, 
  titulo: String,
  descripcion: String,
  realizado: Boolean,
  destacado: Boolean
});

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  correo: { type: String, unique: true },
  password: String,
  tareas: [tareaSchema]
});

module.exports = mongoose.model('Usuario', usuarioSchema);