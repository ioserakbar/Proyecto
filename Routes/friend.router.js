const express= require('express');
const router = express.Router();
const Service = require('../Services/friend.service');
const service = new Service();
const validatorHandler = require('./../Middlewares/validator.handler')
const { createFriendchema, updateFriendSchema, getValidFriend } = require('../Schemas/friend.schema');


//GET ALL PRODUCTS
router.get('/', (req, res, next) => {

  try{

    const {size} = req.query;
    const friends = service.find(size || 10)
    res.json({
      'success': true,
      'message': 'Esos son los amigos encontrados',
      'Data': friends
    });

  } catch (error){
    next(error);
  }

});
 
//CREATE PRODUCTS
router.post('/', validatorHandler(createFriendchema, 'body'), (req, res, next) => {  
  try {
    const body = req.body;
    const friend = service.create(body);

    res.json({
      'success': true, 
      'message': "El amigo se ha creado con exito", 
      'Data': friend 
   });
  } catch (error) {
    next(error);
  }

});

//rutas especificas /:id
//GET PRODUCTS BY ID
router.get('/:id', validatorHandler(getValidFriend, 'params'),  (req, res, next) => {
  try{
    const {id} = req.params;

    const friend =  service.findOne(id);
    res.json({
      'success': true,
      'message': 'Este es el amigo encontrado',
      'Data': friend
    });
  } catch (error){
    next(error);
  }
});

//PUT = TODOS LOS CAMPOS SE ACTUALIZAN
//PATCH =  ACTUALIZACION PARCIAL DE CAMPOS
//UPDATE
router.patch('/:id', validatorHandler(getValidFriend, 'params'), validatorHandler(updateFriendSchema, 'body'), (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const { old, changed} = service.update(id, data);
    res.json({
      'success': true,
      'message': "Se ha actualizado el siguiente amigo",
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
router.delete('/:id', validatorHandler(getValidFriend, 'params'), (req, res, next) => {
  try {
    const { id } = req.params;
    const friend = service.delete(id);
    res.json({
      'success': true,
      'message': "Se ha eliminado este amigo",
      'Data': {
        "message": "Amigo eliminado",
        "Data" : friend
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;