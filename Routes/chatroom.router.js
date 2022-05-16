const express = require('express');
const router = express.Router();
const Service = require('../Services/chatroom.service');
const service = new Service();
const validatorHandler = require('./../Middlewares/validator.handler')
const { createChatroomSchema, updateChatroomSchema, getValidChatroom } = require('../Schemas/chatroom.schema');
const ensureToken = require('./../Middlewares/ensureToken.handler');


//GET ALL PRODUCTS
router.get('/', ensureToken, async (req, res, next) => {

  try {

    const { size } = req.query;
    const filter = req.body;
    const chatrooms = await service.find(size || 10, filter);
    res.json({
      'success': true,
      'message': 'Estos son los chat rooms encontrados',
      'Data': chatrooms
    });
  } catch (error) {
    next(error);
  }

});
//

//CREATE PRODUCTS
router.post('/', ensureToken, validatorHandler(createChatroomSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body;
    const allRooms = await service.find(null, body);
    const ydob = {
      userOne: body.userTwo,
      userTwo: body.userOne
    }
    const smooRlla = await service.find(null, ydob);
    var chatroom = {};
    if (allRooms.length <= 0 && smooRlla <= 0) {
      chatroom = await service.create(body);

      res.json({
        'success': true,
        'message': "El chat room se ha creado con exito",
        'Data': chatroom
      });
    } else {
      let id = '';
      if (allRooms.length > 0) {

        id = allRooms[0]._id;
      }
      else if (smooRlla.length > 0) {
        id = smooRlla[0]._id;
      }

      chatroom['_id'] = id;
      res.json({
        'success': true,
        'message': "El chatroom ya existe",
        'Data': chatroom
      });
    }

  } catch (error) {
    next(error);
  }

});

//rutas especificas /:id
//GET PRODUCTS BY ID
router.get('/:id', ensureToken, validatorHandler(getValidChatroom, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;

    const chatroom = await service.findOne(id);
    res.json({
      'success': true,
      'message': 'Este es el chat room encontrado',
      'Data': chatroom
    });
  } catch (error) {
    next(error);
  }
});

//PUT = TODOS LOS CAMPOS SE ACTUALIZAN
//PATCH =  ACTUALIZACION PARCIAL DE CAMPOS
//UPDATE
router.patch('/:id', ensureToken, validatorHandler(getValidChatroom, 'params'), validatorHandler(updateChatroomSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const { old, changed } = await service.update(id, data);
    res.json({
      'success': true,
      'message': "Se ha actualizado el siguiente chat room",
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
router.delete('/:id', ensureToken, validatorHandler(getValidChatroom, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const chatroom = await service.delete(id);
    res.json({
      'success': true,
      'message': "Se ha eliminado este chat room",
      'Data': {
        "message": "Chat room eliminado",
        "Data": chatroom
      }
    });
  } catch (error) {
    next(error);
  }
});



module.exports = router;