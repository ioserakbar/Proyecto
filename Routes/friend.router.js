const express= require('express');
const router = express.Router();
const Service = require('../Services/friend.service');
const service = new Service();
const validatorHandler = require('./../Middlewares/validator.handler')
const { createCommentchema, updateCommentSchema, getValidComment } = require('../Schemas/friend.schema');


//GET ALL PRODUCTS
router.get('/', (req, res, next) => {

  try{

    const {size} = req.query;
    const friends = service.find(size || 10)
    res.json({
      'success': true,
      'message': 'Esta es la multimedia en los comentarios encontrados',
      'Data': friends
    });

  } catch (error){
    next(error);
  }

});
 
//CREATE PRODUCTS
router.post('/', validatorHandler(createCommentchema, 'body'), (req, res, next) => {  
  try {
    const body = req.body;
    const friend = service.create(body);

    res.json({
      'success': true, 
      'message': "El comentario se ha creado con exito", 
      'Data': friend 
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

    const friend =  service.findOne(id);
    res.json({
      'success': true,
      'message': 'Este es el comentario encontrado',
      'Data': friend
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
    const friend = service.delete(id);
    res.json({
      'success': true,
      'message': "Se ha eliminado este comentario",
      'Data': {
        "message": "Chat room  eliminado",
        "product" : friend
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;