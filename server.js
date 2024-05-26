const express = require('express');
const path = require('path');
const mongoOperations = require('./mongodbOperations');

const app = express();

// Configura el middleware para analizar cuerpos de formulario y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.get('/home', (req, res) => {
    res.render('inicio', { title: 'Mi aplicación', message: '¡Hola, mundo!' });
});

app.get('/signup', (req, res) => {
    res.render('crearCuenta', { title: 'Mi aplicación', message: '¡Hola, mundo!' });
});

app.get('/planes', (req, res) => {
    res.render('planes', { title: 'Mi aplicación', message: '¡Hola, mundo!' });
});

app.get('/crearCuenta', (req, res) => {
    res.render('crearCuenta', { title: 'Mi aplicación', message: '¡Hola, mundo!' });
});

app.post('/auth/signup', async (req, res) => {
    try {
        const userId = await mongoOperations.insertUser(req.body);
        res.send({ userId });
    } catch (e) {
        res.status(400).send(e.message);
    }
});

app.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await mongoOperations.loginUser(email, password);
        res.send({ user });
    } catch (e) {
        res.status(400).send(e.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
