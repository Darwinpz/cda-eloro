const ctrl = {};

ctrl.inicio = async (req, res, next) => {

    datos = []
    res.render('index.hbs', {datos});

};

ctrl.buscar = async (req,res,next)=>{

    const id = req.params.id;

    res.render('ver_usuarios.hbs',{id:id});
    
}

module.exports = ctrl;