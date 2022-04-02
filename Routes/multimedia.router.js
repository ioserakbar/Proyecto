const express= require('express');
const router = express.Router();
const Service = require('../Services/multimedia.service');
const service = new Service();
const validatorHandler = require('./../Middlewares/validator.handler')
const { createMultimediaSchema, updateMultimediaSchema, getValidMultimedia} = require('../Schemas/multimedia.schema');


//GET ALL PRODUCTS
router.get('/', async (req, res, next) => {

  try{

    const {size} = req.query;
    const filter = req.body;
    const multimedias = await service.find(size || 10, filter);
    res.json({
      'success': true,
      'message': 'Esta es la multimedia en los comentarios encontrados',
      'Data': multimedias
    });

  } catch (error){
    next(error);
  }

});
 
//CREATE PRODUCTS
router.post('/', validatorHandler(createMultimediaSchema, 'body'), async (req, res, next) => {  
  try {
    const body = req.body;
    const multimedia = await service.create(body);

    res.json({
      'success': true, 
      'message': "La multimedia se ha creado con exito", 
      'Data': multimedia 
   });
  } catch (error) {
    next(error);
  }

});

//rutas especificas /:id
//GET PRODUCTS BY ID
router.get('/:id', validatorHandler(getValidMultimedia, 'params'),  async (req, res, next) => {
  try{
    const {id} = req.params;

    const multimedia =  await service.findOne(id);
    res.json({
      'success': true,
      'message': 'Esta es la multimedia encontrado',
      'Data': multimedia
    });
  } catch (error){
    next(error);
  }
});

//PUT = TODOS LOS CAMPOS SE ACTUALIZAN
//PATCH =  ACTUALIZACION PARCIAL DE CAMPOS
//UPDATE
router.patch('/:id', validatorHandler(getValidMultimedia, 'params'), validatorHandler(updateMultimediaSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const { old, changed} = await service.update(id, data);
    res.json({
      'success': true,
      'message': "Se ha actualizado la siguiente multimedia",
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
router.delete('/:id', validatorHandler(getValidMultimedia, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const multimedia = await service.delete(id);
    res.json({
      'success': true,
      'message': "Se ha eliminado esta multimedia",
      'Data': {
        "message": "Multimedia eliminado",
        "Data" : multimedia
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;