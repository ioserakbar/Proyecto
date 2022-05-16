const express = require('express');
const router = express.Router();
const Service = require('../Services/notrecommended.service');
const service = new Service();
const validatorHandler = require('./../Middlewares/validator.handler')
const { createNotRecommendedSchema, updateNotRecommendedSchema, getValidNotRecommended } = require('../Schemas/notrecommended.schema');
const ensureToken = require('../Middlewares/ensureToken.handler');


//GET ALL PRODUCTS
router.get('/', ensureToken, async (req, res, next) => {

  try {

    const { size } = req.query;
    const filter = req.body;
    const notRecommendeds = await service.find(size || 10, filter);
    res.json({
      'success': true,
      'message': 'Estos son los no recomendados encontrados',
      'Data': notRecommendeds
    });

  } catch (error) {
    next(error);
  }

});

//CREATE PRODUCTS
router.post('/', ensureToken, validatorHandler(createNotRecommendedSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body;
    const notRecommended = await service.create(body);

    res.json({
      'success': true,
      'message': "El no recomendado se ha creado con exito",
      'Data': notRecommended
    });
  } catch (error) {
    next(error);
  }

});

//rutas especificas /:id
//GET PRODUCTS BY ID
router.get('/:id', ensureToken, validatorHandler(getValidNotRecommended, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;

    const notRecommended = await service.findOne(id);
    res.json({
      'success': true,
      'message': 'Este es el no recomendado encontrado',
      'Data': notRecommended
    });
  } catch (error) {
    next(error);
  }
});

//PUT = TODOS LOS CAMPOS SE ACTUALIZAN
//PATCH =  ACTUALIZACION PARCIAL DE CAMPOS
//UPDATE
router.patch('/:id', ensureToken, validatorHandler(getValidNotRecommended, 'params'), validatorHandler(updateNotRecommendedSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const { old, changed } = await service.update(id, data);
    res.json({
      'success': true,
      'message': "Se ha actualizado el siguiente no recomendado",
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
router.delete('/:id', ensureToken, validatorHandler(getValidNotRecommended, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const notRecommended = await service.delete(id);
    res.json({
      'success': true,
      'message': "Se ha eliminado este no recomendado",
      'Data': {
        "message": "No recomendado eliminado",
        "Data": notRecommended
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;