require('dotenv').config(); //Permite acceder al archivo .env del servidor

const app = require("./src/app"); //Instancia de la aplicación

/*
    * Ejecución del servidor en el puerto escogido
*/
app.listen(app.get('port'),()=>{

    console.log("Servidor iniciado, Puerto: ",app.get('port'));

});