const mongoose = require ('mongoose');

const libroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        require: true
    },
    autor: {
        type: String,
        require: true,
    },
    categoria: {
        type: String,
        require: true,
    },
    estado: {
        type: String,
        enum: ['Disponible','Prestado','Vencido'],
        default: 'Disponible',

    },
    fechaPrestamo: {
        type: Date,
    },
    fechaDevolución: {
        type: Date,

    }
},//Configuraciones adicionales
{
    timestamps: true, //fecha de creacion y modificación como columna
}
);

const modelLibro= mongoose.model("Libro", libroSchema);
module.exports = modelLibro;