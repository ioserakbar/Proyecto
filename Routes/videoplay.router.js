const express= require('express');
const router = express.Router();
const Service = require('../Services/videoplay.service');
const service = new Service();
const validatorHandler = require('./../Middlewares/validator.handler')
const { createCommentchema, updateCommentSchema, getValidComment } = require('../Schemas/videoplay.schema');


//GET ALL PRODUCTS
router.get('/', (req, res, next) => {

  try{

    const {size} = req.query;
    const videoplays = service.find(size || 10)
    res.json({
      'success': true,
      'message': 'Estas son las plays encontrados',
      'Data': videoplays
    });

  } catch (error){
    next(error);
  }

});
 
//CREATE PRODUCTS
router.post('/', validatorHandler(createCommentchema, 'body'), (req, res, next) => {  
  try {
    const body = req.body;
    const videoplay = service.create(body);

    res.json({
      'success': true, 
      'message': "La play se ha creado con exito", 
      'Data': videoplay 
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

    const videoplay =  service.findOne(id);
    res.json({
      'success': true,
      'message': 'Esta es la play encontrado',
      'Data': videoplay
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
      'message': "Se ha actualizado la siguiente play",
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
    const videoplay = service.delete(id);
    res.json({
      'success': true,
      'message': "Se ha eliminado esta play",
      'Data': {
        "message": "Play eliminada",
        "Data" : videoplay
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;