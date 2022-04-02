const express= require('express');
const router = express.Router();
const Service = require('../Services/publication.service');
const service = new Service();
const validatorHandler = require('./../Middlewares/validator.handler')
const { createPublicationSchema, updatePublicationSchema, getValidPublication } = require('../Schemas/publication.schema');


//GET ALL PRODUCTS
router.get('/', async (req, res, next) => {

  try{

    const {size} = req.query;
    const filter = req.body;
    const recommendeds = await service.find(size || 10, filter);
    res.json({
      'success': true,
      'message': 'Estas son las publicaciones encontradas',
      'Data': recommendeds
    });

  } catch (error){
    next(error);
  }

});
 
//CREATE PRODUCTS
router.post('/', validatorHandler(createPublicationSchema, 'body'), async (req, res, next) => {  
  try {
    const body = req.body;
    const recommended = await service.create(body);

    res.json({
      'success': true, 
      'message': "La publicacion se ha creado con exito", 
      'Data': recommended 
   });
  } catch (error) {
    next(error);
  }

});

//rutas especificas /:id
//GET PRODUCTS BY ID
router.get('/:id', validatorHandler(getValidPublication, 'params'),  async (req, res, next) => {
  try{
    const {id} = req.params;

    const recommended =  await service.findOne(id);
    res.json({
      'success': true,
      'message': 'Esta es la publicacion encontrada',
      'Data': recommended
    });
  } catch (error){
    next(error);
  }
});

//PUT = TODOS LOS CAMPOS SE ACTUALIZAN
//PATCH =  ACTUALIZACION PARCIAL DE CAMPOS
//UPDATE
router.patch('/:id', validatorHandler(getValidPublication, 'params'), validatorHandler(updatePublicationSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const { old, changed} = await service.update(id, data);
    res.json({
      'success': true,
      'message': "Se ha actualizado la publicacion encontrada",
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
router.delete('/:id', validatorHandler(getValidPublication, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const recommended = await service.delete(id);
    res.json({
      'success': true,
      'message': "Se ha eliminado esta publicacion",
      'Data': {
        "message": "Publicaicon eliminada",
        "Data" : recommended
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;