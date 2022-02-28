const express= require('express');
const router = express.Router();
const Service = require('../Services/commentmultimedia.service');
const service = new Service();
const validatorHandler = require('./../Middlewares/validator.handler')
const { createCommentchema, updateCommentSchema, getValidComment } = require('../Schemas/commentmultimedia.schema');


//GET ALL PRODUCTS
router.get('/', (req, res, next) => {

  try{

    const {size} = req.query;
    const commentMultimedias = service.find(size || 10)
    res.json({
      'success': true,
      'message': 'Esta es la multimedia en los comentarios encontrados',
      'Data': commentMultimedias
    });

  } catch (error){
    next(error);
  }

});
 
//CREATE PRODUCTS
router.post('/', validatorHandler(createCommentchema, 'body'), (req, res, next) => {  
  try {
    const body = req.body;
    const commentMultimedia = service.create(body);

    res.json({
      'success': true, 
      'message': "La multimedia del comentario se ha creado con exito", 
      'Data': commentMultimedia 
   });
  } catch (error) {
    next(error);
  }

});

//rutas especificas /:id
//GET PRODUCTS BY ID
router.get('/:id', validatorHandler(getValidComment, 'params'),  (req, res, next) => {
  try{
    const {id} = req.params;

    const commentMultimedia =  service.findOne(id);
    res.json({
      'success': true,
      'message': 'Este es la multimedia del comentario encontrado',
      'Data': commentMultimedia
    });
  } catch (error){
    next(error);
  }
});

//PUT = TODOS LOS CAMPOS SE ACTUALIZAN
//PATCH =  ACTUALIZACION PARCIAL DE CAMPOS
//UPDATE
router.patch('/:id', validatorHandler(getValidComment, 'params'), validatorHandler(updateCommentSchema, 'body'), (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const { old, changed} = service.update(id, data);
    res.json({
      'success': true,
      'message': "Se ha actualizado la siguiente multimedia del comentario",
      'Data': {
        "Original": old,
        "Modificado": changed
      }
    });
  } catch (error) {
    next(error);
  }
});

//DELETE
router.delete('/:id', validatorHandler(getValidComment, 'params'), (req, res, next) => {
  try {
    const { id } = req.params;
    const commentMultimedia = service.delete(id);
    res.json({
      'success': true,
      'message': "Se ha eliminado la multimedia de este comentario",
      'Data': {
        "message": "Multimedia del comentario eliminado",
        "Data" : commentMultimedia
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;