const express= require('express');
const router = express.Router();
const Service = require('../Services/game.service');
const service = new Service();
const validatorHandler = require('./../Middlewares/validator.handler')
const { createGameSchema, updateGameSchema, getValidGame  } = require('../Schemas/game.schema');


//GET ALL PRODUCTS
router.get('/', (req, res, next) => {

  try{

    const {size} = req.query;
    const games = service.find(size || 10)
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
router.post('/', validatorHandler(createGameSchema, 'body'), (req, res, next) => {  
  try {
    const body = req.body;
    const game = service.create(body);

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
router.get('/:id', validatorHandler(getValidGame, 'params'),  (req, res, next) => {
  try{
    const {id} = req.params;

    const game =  service.findOne(id);
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
router.patch('/:id', validatorHandler(getValidGame, 'params'), validatorHandler(updateGameSchema, 'body'), (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const { old, changed} = service.update(id, data);
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
router.delete('/:id', validatorHandler(getValidGame, 'params'), (req, res, next) => {
  try {
    const { id } = req.params;
    const game = service.delete(id);
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