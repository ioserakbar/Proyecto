const express= require('express');
const router = express.Router();
const Service = require('../Services/game.service');
const service = new Service();
const validatorHandler = require('./../Middlewares/validator.handler')
const { createGameSchema, updateGameSchema, getValidGame  } = require('../Schemas/game.schema');


//GET ALL PRODUCTS
router.get('/', async (req, res, next) => {

  try{

    const {size} = req.query;
    const filter = req.body;
    const games = await service.find(size || 10, filter);
    res.json({
      'success': true,
      'message': 'Estos son los juegos encontrados',
      'Data': games
    });

  } catch (error){
    next(error);
  }

});
 
//CREATE PRODUCTS
router.post('/', validatorHandler(createGameSchema, 'body'), async (req, res, next) => {  
  try {
    const body = req.body;
    const game = await service.create(body);

    res.json({
      'success': true, 
      'message': "El juego se ha creado con exito", 
      'Data': game 
   });
  } catch (error) {
    next(error);
  }

});

//rutas especificas /:id
//GET PRODUCTS BY ID
router.get('/:id', validatorHandler(getValidGame, 'params'),  async (req, res, next) => {
  try{
    const {id} = req.params;

    const game =  await service.findOne(id);
    res.json({
      'success': true,
      'message': 'Este es el juego encontrado',
      'Data': game
    });
  } catch (error){
    next(error);
  }
});

//PUT = TODOS LOS CAMPOS SE ACTUALIZAN
//PATCH =  ACTUALIZACION PARCIAL DE CAMPOS
//UPDATE
router.patch('/:id', validatorHandler(getValidGame, 'params'), validatorHandler(updateGameSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const { old, changed} = await service.update(id, data);
    res.json({
      'success': true,
      'message': "Se ha actualizado el siguiente juego",
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
router.delete('/:id', validatorHandler(getValidGame, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const game = await service.delete(id);
    res.json({
      'success': true,
      'message': "Se ha eliminado este juego",
      'Data': {
        "message": "Juego eliminado",
        "Data" : game
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;