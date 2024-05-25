const express = require('express');
const app = express();
const port = 3000;

const handleserver = function (req, res) {
    res.writeHead(404, {})
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/login', (req, res) => {
    res.send('Esto es un dashboard!');
});

app.get('/signup', (req, res) => {
  res.send('Esto es un dashboard!');
});

app.get('/planesdeahorro', (req, res) => {
  res.send('Esto es un dashboard!');
});


app.get('/data', (req, res) => {
  res.send('Esto es un dashboard!');
});


app.use((req, res)=> {
  res.send('No se encontro ni una pagina crack');
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
