

// Controladores
const index = require('../controllers/index');

module.exports = (app) => {

    app.get('/', index.inicio);


    // Errores
    app.use(function (err, req, res, next) {

        res.status(err.status).render('errores/' + err.status, { sesion: req.session });

    });



}