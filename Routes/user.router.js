const express= require('express');
const router = express.Router();
const Service = require('../Services/user.service');
const service = new Service();
const validatorHandler = require('./../Middlewares/validator.handler')
const { createCommentchema, updateCommentSchema, getValidComment } = require('../Schemas/user.schema');


//GET ALL PRODUCTS
router.get('/', (req, res, next) => {

  try{

    const {size} = req.query;
    const users = service.find(size || 10)
    res.json({
      'success': true,
      'message': 'Estos son los usuarios encontrados',
      'Data': users
    });

  } catch (error){
    next(error);
  }

});
 
//CREATE PRODUCTS
router.post('/', validatorHandler(createCommentchema, 'body'), (req, res, next) => {  
  try {
    const body = req.body;
    const user = service.create(body);

    res.json({
      'success': true, 
      'message': "El usuario se ha creado con exito", 
      'Data': user 
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

    const user =  service.findOne(id);
    res.json({
      'success': true,
      'message': 'Este es el usuario encontrado',
      'Data': user
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
      'message': "Se ha actualizado el siguiente usuario",
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
    const user = service.delete(id);
    res.json({
      'success': true,
      'message': "Se ha eliminado este usuario",
      'Data': {
        "message": "Usuario eliminado",
        "product" : user
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;