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

// Obtener usuario por correo
app.get('/usuario', async (req, res) => {
  const { correo } = req.query;
  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) return res.status(404).send('No encontrado');
    res.json(usuario);
  } catch (error) {
    res.status(500).send('Error interno');
  }
});

// Añadir tarea
app.post('/tarea', async (req, res) => {
  const { correo, titulo, descripcion, fecha } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) return res.status(404).send('Usuario no encontrado');

    const nuevaTarea = {
      id: usuario.tareas.length + 1,
      fecha,
      titulo,
      descripcion,
      realizado: false,
      destacado: false
    };

    usuario.tareas.push(nuevaTarea);
    await usuario.save();

    res.status(201).send('Tarea añadida');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al agregar tarea');
  }
});


// Marcar tarea como realizada
app.put('/tarea/realizada', async (req, res) => {
  const { correo, id } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) return res.status(404).send('Usuario no encontrado');

    const tarea = usuario.tareas.find(t => t.id === id);
    if (!tarea) return res.status(404).send('Tarea no encontrada');

    tarea.realizado = true;
    await usuario.save();
    res.send('Tarea marcada como realizada');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar tarea');
  }
});

// Destacar tarea
app.put('/tarea/destacar', async (req, res) => {
  const { correo, id, destacado } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) return res.status(404).send('Usuario no encontrado');

    const tarea = usuario.tareas.find(t => t.id === id);
    if (!tarea) return res.status(404).send('Tarea no encontrada');

    tarea.destacado = destacado;
    await usuario.save();
    res.send(`Tarea ${destacado ? 'destacada' : 'desmarcada como destacada'}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cambiar destacado');
  }
});

// Eliminar tarea
app.delete('/tarea', async (req, res) => {
  const { correo, id } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) return res.status(404).send('Usuario no encontrado');

    const indice = usuario.tareas.findIndex(t => t.id === id);
    if (indice === -1) return res.status(404).send('Tarea no encontrada');

    usuario.tareas.splice(indice, 1);
    await usuario.save();

    res.send('Tarea eliminada');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar tarea');
  }
});


// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
