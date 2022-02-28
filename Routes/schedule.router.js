const express= require('express');
const router = express.Router();
const Service = require('../Services/schedule.service');
const service = new Service();
const validatorHandler = require('./../Middlewares/validator.handler')
const { createCommentchema, updateCommentSchema, getValidComment } = require('../Schemas/schedule.schema');


//GET ALL PRODUCTS
router.get('/', (req, res, next) => {

  try{

    const {size} = req.query;
    const schedules = service.find(size || 10)
    res.json({
      'success': true,
      'message': 'Esta es la multimedia en los comentarios encontrados',
      'Data': schedules
    });

  } catch (error){
    next(error);
  }

});
 
//CREATE PRODUCTS
router.post('/', validatorHandler(createCommentchema, 'body'), (req, res, next) => {  
  try {
    const body = req.body;
    const schedule = service.create(body);

    res.json({
      'success': true, 
      'message': "El comentario se ha creado con exito", 
      'Data': schedule 
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

    const schedule =  service.findOne(id);
    res.json({
      'success': true,
      'message': 'Este es el comentario encontrado',
      'Data': schedule
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
      'message': "Se ha actualizado el siguiente comentario",
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
    const schedule = service.delete(id);
    res.json({
      'success': true,
      'message': "Se ha eliminado este comentario",
      'Data': {
        "message": "Chat room  eliminado",
        "product" : schedule
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;