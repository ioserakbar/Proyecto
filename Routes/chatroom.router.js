const express= require('express');
const router = express.Router();
const Service = require('../Services/chatroom.service');
const service = new Service();
const validatorHandler = require('./../Middlewares/validator.handler')
const { createChatroomSchema, updateChatroomSchema, getValidChatroom } = require('../Schemas/chatroom.schema');


//GET ALL PRODUCTS
router.get('/', (req, res, next) => {

  try{

    const {size} = req.query;
    const chatrooms = service.find(size || 10)
    res.json({
      'success': true,
      'message': 'Estos son los productos encontrados',
      'Data': chatrooms
    });

  } catch (error){
    next(error);
  }

});
 
//CREATE PRODUCTS
router.post('/', validatorHandler(createChatroomSchema, 'body'), (req, res, next) => {  
  try {
    const body = req.body;
    const chatroom = service.create(body);

    res.json({
      'success': true, 
      'message': "El chat room se ha creado con exito", 
      'Data': chatroom 
   });
  } catch (error) {
    next(error);
  }

});

//rutas especificas /:id
//GET PRODUCTS BY ID
router.get('/:id', validatorHandler(getValidChatroom, 'params'),  (req, res, next) => {
  try{
    const {id} = req.params;

    const chatroom =  service.findOne(id);
    res.json({
      'success': true,
      'message': 'Este es el chat room encontrado',
      'Data': chatroom
    });
  } catch (error){
    next(error);
  }
});

//PUT = TODOS LOS CAMPOS SE ACTUALIZAN
//PATCH =  ACTUALIZACION PARCIAL DE CAMPOS
//UPDATE
router.patch('/:id', validatorHandler(getValidChatroom, 'params'), validatorHandler(updateChatroomSchema, 'body'), (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const { old, changed} = service.update(id, data);
    res.json({
      'success': true,
      'message': "Se ha actualizado el siguiente chat room",
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
router.delete('/:id', validatorHandler(getValidChatroom, 'params'), (req, res, next) => {
  try {
    const { id } = req.params;
    const chatroom = service.delete(id);
    res.json({
      'success': true,
      'message': "Se ha eliminado este chat room",
      'Data': {
        "message": "Chat room  eliminado",
        "product" : chatroom
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;