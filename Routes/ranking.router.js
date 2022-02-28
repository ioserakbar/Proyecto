const express= require('express');
const router = express.Router();
const Service = require('../Services/publicationMultimedia.service');
const service = new Service();
const validatorHandler = require('./../Middlewares/validator.handler')
const { createPublicationSchema, updatePublicationSchema, getValidPublication } = require('../Schemas/publicationMultimedia.schema');


//GET ALL PRODUCTS
router.get('/', (req, res, next) => {

  try{

    const {size} = req.query;
    const recommendeds = service.find(size || 10)
    res.json({
      'success': true,
      'message': 'Estas son las mutlimedias de las publicaciones encontradas',
      'Data': recommendeds
    });

  } catch (error){
    next(error);
  }

});
 
//CREATE PRODUCTS
router.post('/', validatorHandler(createPublicationSchema, 'body'), (req, res, next) => {  
  try {
    const body = req.body;
    const recommended = service.create(body);

    res.json({
      'success': true, 
      'message': "La multimedia de la publicacion se ha creado con exito", 
      'Data': recommended 
   });
  } catch (error) {
    next(error);
  }

});

//rutas especificas /:id
//GET PRODUCTS BY ID
router.get('/:id', validatorHandler(getValidPublication, 'params'),  (req, res, next) => {
  try{
    const {id} = req.params;

    const recommended =  service.findOne(id);
    res.json({
      'success': true,
      'message': 'Esta es la multimedia de la publicacion encontrada',
      'Data': recommended
    });
  } catch (error){
    next(error);
  }
});

//PUT = TODOS LOS CAMPOS SE ACTUALIZAN
//PATCH =  ACTUALIZACION PARCIAL DE CAMPOS
//UPDATE
router.patch('/:id', validatorHandler(getValidPublication, 'params'), validatorHandler(updatePublicationSchema, 'body'), (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const { old, changed} = service.update(id, data);
    res.json({
      'success': true,
      'message': "Se ha actualizado la multimedia de la publicacion encontrada",
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
router.delete('/:id', validatorHandler(getValidPublication, 'params'), (req, res, next) => {
  try {
    const { id } = req.params;
    const recommended = service.delete(id);
    res.json({
      'success': true,
      'message': "Se ha eliminado la multimedia de esta publicacion",
      'Data': {
        "message": "Multimedia de la publicaicon eliminada",
        "Data" : recommended
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;