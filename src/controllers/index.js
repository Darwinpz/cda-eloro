const ctrl = {};

ctrl.inicio = async (req, res, next) => {

    datos = []
    res.render('index.hbs', {datos});

};


module.exports = ctrl;