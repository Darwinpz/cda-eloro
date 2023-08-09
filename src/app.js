const express = require("express");
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require("morgan");

const app = express();


//PUERTO DEL SERVIDOR
app.set('port', process.env.PORT || process.env.PORTSERVER); //Información colocada en el archivo .env

app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs.engine({

    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('../src/libs/index.js')
}));

app.set('view engine', '.hbs');


//MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(morgan('dev'));


//static files
app.use(express.static(path.join(__dirname, 'public')));

//ARCHIVO DE RUTAS DEL SERVIDOR
require('./routes/index')(app)

module.exports = app;