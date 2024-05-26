const express = require('express');
const path = require('path');
const geminis = require('./geminis.js');
const mongoOperations = require('./mongodbOperations');
const { MongoClient } = require('mongodb');

const app = express();

// Configura el middleware para analizar cuerpos de formulario y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Middleware para autenticar sesiones
function authenticate(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.redirect('/');
    }
}

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

app.get('/planes',  (req, res) => {
    res.render('planes', { title: 'Mi aplicación', message: '¡Hola, mundo!' });
});

app.get('/crearCuenta', (req, res) => {
    res.render('crearCuenta', { title: 'Mi aplicación', message: '¡Hola, mundo!' });
});

app.post('/auth/signup', async (req, res) => {
    try {
        const { email } = req.body;

        // Verifica si el usuario ya existe
        const exists = await mongoOperations.userExists(email);
        if (exists) {
            res.redirect("/");
        }else{
            res.redirect("/home");
        }
        const userId = await mongoOperations.insertUser(req.body);
    } catch (e) {
        console.log(e);
    }
});

app.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await mongoOperations.loginUser(email, password);
        if(user == "inicio"){
            geminis.run(req, res);
        }else{
            res.redirect("/");
        }
    } catch (e) {
        console.log(e);
    }
});

app.get('/crearCuenta', (req, res) => {
    res.render('crearCuenta', { title: 'Mi aplicación', message: '¡Hola, mundo!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.post('/getDogtaChart', async (req, res) => {
    if (!req.body.link) {
        return res.status(400).json({ error: 'ID is required' });
    }
    try {
        const data = await mongoOperations.getDogtaChart("e23da8e2-f168-4e47-8450-f7542cc80fe2")
        res.json(data)
    } catch (e) {
        console.error("Error:", e);
        res.status(500).json({ e: 'An error occurred' });
    }
})
