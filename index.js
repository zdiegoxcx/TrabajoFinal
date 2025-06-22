const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Usuario = require('./Usuario'); // Modelo externo

const app = express();
const PORT = 3000;

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/usuarios', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
//aqui deberia ir un console.log, pero el varela dijo que eran mala practica

// Middleware (para el jason)
app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.json());

// Registro de usuario
app.post('/register', async (req, res) => {
  const { nombre, apellido, correo, password } = req.body;

  if (!nombre || !apellido || !correo || !password) {
    return res.status(400).send('Faltan datos');
  }

  try {
    const nuevoUsuario = new Usuario({ nombre, apellido, correo, password });
    await nuevoUsuario.save();
    res.status(201).send('Usuario registrado');
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send('El correo ya está en uso');
    }
    console.error(error);
    res.status(500).send('Error interno');
  }
});

// Inicio de sesión
app.post('/login', async (req, res) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).send('Faltan datos');
  }

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) return res.status(401).send('Usuario no encontrado');

    if (usuario.password !== password) {
      return res.status(401).send('Contraseña incorrecta');
    }

    res.send(`Bienvenido ${usuario.nombre} ${usuario.apellido}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno');
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
