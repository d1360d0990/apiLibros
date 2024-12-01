const express = require('express');
const router = express.Router();
const modelLibro = require('../models/libroModel'); // Importar el modelo de libros

// Obtener todos los libros (GET)
router.get('/libros', async (req, res) => {
    try {
        const libros = await modelLibro.find(); // Obtener todos los libros
        res.status(200).send(libros);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener los libros', error });
    }
});

// Obtener un libro por ID (GET)
router.get('/libros/:id', async (req, res) => {
    try {
        const libro = await modelLibro.findById(req.params.id); // Buscar libro por ID
        if (!libro) {
            return res.status(404).send({ mensaje: 'Libro no encontrado' });
        }
        res.status(200).send(libro);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener el libro', error });
    }
});

// Crear un nuevo libro (POST)
router.post('/libros', async (req, res) => {
    const body = req.body;
    try {
        const nuevoLibro = await modelLibro.create(body); // Insertar en la base de datos
        res.status(201).send(nuevoLibro); // 201 indica que se ha creado un recurso
    } catch (error) {
        res.status(400).send(error); // Manejar errores
    }
});

// Actualizar un libro por ID (PUT)
router.put('/libros/:id', async (req, res) => {
    try {
        const libroActualizado = await modelLibro.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!libroActualizado) {
            return res.status(404).send({ mensaje: 'Libro no encontrado' });
        }
        res.status(200).send(libroActualizado);
    } catch (error) {
        res.status(400).send({ mensaje: 'Error al actualizar el libro', error });
    }
});

// Eliminar un libro por ID (DELETE)
router.delete('/libros/:id', async (req, res) => {
    try {
        const libroEliminado = await modelLibro.findByIdAndDelete(req.params.id); // Eliminar libro por ID
        if (!libroEliminado) {
            return res.status(404).send({ mensaje: 'Libro no encontrado' });
        }
        res.status(200).send({ mensaje: 'Libro eliminado correctamente' });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar el libro', error });
    }
});

//--------------------------------------EndPoint----------------------------------------------------
//Obetener libros segun los filtros de busqueda
router.get ('/libros/negocio/busqueda', async (req,res)=>{
    const {autor, categoria, estado} = req.query; //obtenes autor, categoria y estado desde la query

    try{
        const query = {};// creamos un objeto vacio para almacenar los filtros
        if(autor) query.autor = autor; //si el autor esta en los query params, lo va a agregar al filtro
        if(categoria) query.categoria = categoria;//si la categoria esta en los query params, lo va a agregar al filtro
        if(estado) query.estado = estado;//si el estado esta en los query params, lo va a agregar al filtro

        const libros = await modelLibro.find (query);

        if(!libros.length){
            return res.status (404).send({mensaje: 'No se encontraron libros con los fliltros proporcionados'});
        }
        res.status (200).send(libros);


    }catch (error){
        res.status (500).send ({mensaje: 'Error al obtener los libros', error})
    }
})

module.exports = router;