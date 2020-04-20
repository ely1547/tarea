const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

app.get('/', (req, res) =>{

    res.setHeader('Content-type', 'text/html');
    res.sendfile('./public/index.html');
})

app.get('/get-productos', (req, res) => {
    const file = fs.readFileSync('./productos.json', 'UTF-8');
    
    res.setHeader('Content-type', 'text/json');
    res.send(file);
});


app.post('/new', (req, res) =>{
    res.setHeader('Content-type', 'text/plain');
    const nombre = req.body.nombre;
    const opinion = req.body.opinion;

    //abrir archivo

    let file = fs.readFileSync('./productos.json', 'UTF-8');

    //convertirlo arreglo
    const json = JSON.parse(file);

    //insertar ele
     json.productos.push({"nombre": nombre, "opinion": parseInt(opinion)});
   
    //guardar
    file = fs.writeFileSync('./productos.json', JSON.stringify(json));

    res.send('Datosguardados');
});

app.listen(3001, () =>{
    console.log('3001');

});