const mongoose = require ('mongoose');

//Función para conectar a MongoDB
const dbconnect = async() => {
    try {
        await mongoose.connect ('mongodb://127.0.0.1:27017/dbGestorBiblioteca');
        console.log ('conexión a la base de datos establecida');
    } catch (error) {
        console.error ('Error al intentar conectar con la base de datos: ', error);
        process.exit (1); //detemos el proceso si hay un error grave en la conexión
    }
}

module.exports = dbconnect;