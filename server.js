const express = require('express');
const path = require('path');
const geminis = require('./geminis.js');
const app = express();

// Configura el motor de plantillas Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos desde 'public'
app.use(express.static(path.join(__dirname, 'dist'))); // Servir archivos estáticos desde 'dist'

// Define una ruta para renderizar una vista Pug
app.get('/', (req, res) => {
    res.render('index', { title: 'Mi aplicación', message: '¡Hola, mundo!' });
});

app.get('/home', async (req, res) => {
    geminis.run(req, res);
});

app.get('/signup', (req, res) => {
    res.render('crearCuenta', { title: 'Mi aplicación', message: '¡Hola, mundo!' });
});

app.get('/planes', (req, res) => {
    res.render('planes', { title: 'Mi aplicación', message: '¡Hola, mundo!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
