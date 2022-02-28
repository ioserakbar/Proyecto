const express= require('express');
const router = express.Router();
const Service = require('../Services/country.service');
const service = new Service();
const validatorHandler = require('./../Middlewares/validator.handler')
const { createCommentchema, updateCommentSchema, getValidComment } = require('../Schemas/country.schema');


//GET ALL PRODUCTS
router.get('/', (req, res, next) => {

  try{

    const {size} = req.query;
    const countrys = service.find(size || 10)
    res.json({
      'success': true,
      'message': 'Estos son los paises encontrados',
      'Data': countrys
    });

  } catch (error){
    next(error);
  }

});
 
//CREATE PRODUCTS
router.post('/', validatorHandler(createCommentchema, 'body'), (req, res, next) => {  
  try {
    const body = req.body;
    const country = service.create(body);

    res.json({
      'success': true, 
      'message': "El pais se ha creado con exito", 
      'Data': country 
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

    const country =  service.findOne(id);
    res.json({
      'success': true,
      'message': 'Este es el pais encontrado',
      'Data': country
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
      'message': "Se ha actualizado el siguiente pais",
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
    const country = service.delete(id);
    res.json({
      'success': true,
      'message': "Se ha eliminado este pais",
      'Data': {
        "message": "Pais eliminado",
        "Data" : country
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;