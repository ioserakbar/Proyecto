const express= require('express');
const router = express.Router();
const Service = require('../Services/favoritegames.service');
const service = new Service();
const validatorHandler = require('./../Middlewares/validator.handler')
const { createFavoriteGameSchema, updateFavoriteGameSchema, getValidFavoriteGame } = require('../Schemas/favoritegames.schema');


//GET ALL PRODUCTS
router.get('/', (req, res, next) => {

  try{

    const {size} = req.query;
    const favoriteGames = service.find(size || 10)
    res.json({
      'success': true,
      'message': 'Estos son los juegos favoritos encontrados',
      'Data': favoriteGames
    });

  } catch (error){
    next(error);
  }

});
 
//CREATE PRODUCTS
router.post('/', validatorHandler(createFavoriteGameSchema, 'body'), (req, res, next) => {  
  try {
    const body = req.body;
    const favoriteGame = service.create(body);

    res.json({
      'success': true, 
      'message': "El juego favorito se ha creado con exito", 
      'Data': favoriteGame 
   });
  } catch (error) {
    next(error);
  }

});

//rutas especificas /:id
//GET PRODUCTS BY ID
router.get('/:id', validatorHandler(getValidFavoriteGame, 'params'),  (req, res, next) => {
  try{
    const {id} = req.params;

    const favoriteGame =  service.findOne(id);
    res.json({
      'success': true,
      'message': 'Este es el juego favorito encontrado',
      'Data': favoriteGame
    });
  } catch (error){
    next(error);
  }
});

//PUT = TODOS LOS CAMPOS SE ACTUALIZAN
//PATCH =  ACTUALIZACION PARCIAL DE CAMPOS
//UPDATE
router.patch('/:id', validatorHandler(getValidFavoriteGame, 'params'), validatorHandler(updateFavoriteGameSchema, 'body'), (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const { old, changed} = service.update(id, data);
    res.json({
      'success': true,
      'message': "Se ha actualizado el siguiente juego favorito",
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
router.delete('/:id', validatorHandler(getValidFavoriteGame, 'params'), (req, res, next) => {
  try {
    const { id } = req.params;
    const favoriteGame = service.delete(id);
    res.json({
      'success': true,
      'message': "Se ha eliminado este juego favorito",
      'Data': {
        "message": "Juego favorito eliminado",
        "Data" : favoriteGame
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;