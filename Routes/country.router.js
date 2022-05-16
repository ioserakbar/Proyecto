const express = require('express');
const router = express.Router();
const Service = require('../Services/country.service');
const service = new Service();
const validatorHandler = require('./../Middlewares/validator.handler')
const { createCountrySchema, updateCountrySchema, getValidCountry } = require('../Schemas/country.schema');
const ensureToken = require('../Middlewares/ensureToken.handler');


//GET ALL PRODUCTS
router.get('/', ensureToken, async (req, res, next) => {

  try {

    const { size } = req.query;
    const filter = req.body;
    const countries = await service.find(size || 10, filter);
    res.json({
      'success': true,
      'message': 'Estos son los paises encontrados',
      'Data': countries
    });

  } catch (error) {
    next(error);
  }

});

//CREATE PRODUCTS
router.post('/', ensureToken, validatorHandler(createCountrySchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body;
    const country = await service.create(body);

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
router.get('/:id', ensureToken, validatorHandler(getValidCountry, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;

    const country = await service.findOne(id);
    res.json({
      'success': true,
      'message': 'Este es el pais encontrado',
      'Data': country
    });
  } catch (error) {
    next(error);
  }
});

//PUT = TODOS LOS CAMPOS SE ACTUALIZAN
//PATCH =  ACTUALIZACION PARCIAL DE CAMPOS
//UPDATE
router.patch('/:id', ensureToken, validatorHandler(getValidCountry, 'params'), validatorHandler(updateCountrySchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const { old, changed } = await service.update(id, data);
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
router.delete('/:id', ensureToken, validatorHandler(getValidCountry, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const country = await service.delete(id);
    res.json({
      'success': true,
      'message': "Se ha eliminado este pais",
      'Data': {
        "message": "Pais eliminado",
        "Data": country
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;