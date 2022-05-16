const express = require('express');
const router = express.Router();
const Service = require('../Services/message.service');
const service = new Service();
const validatorHandler = require('./../Middlewares/validator.handler')
const { createMessageSchema, updateMessageSchema, getValidMessage } = require('../Schemas/message.schema');
const ensureToken = require('../Middlewares/ensureToken.handler');


//GET ALL PRODUCTS
router.get('/', ensureToken, async (req, res, next) => {

  try {

    const { size } = req.query;
    const filter = req.body;
    const messages = await service.find(size || 10, filter);
    res.json({
      'success': true,
      'message': 'Estos son los mensajes encontrados',
      'Data': messages
    });

  } catch (error) {
    next(error);
  }

});


router.get('/getFromChatroom/:id', ensureToken, async (req, res, next) => {

  try {

    const { id } = req.params;
    const filter = {
      chatRoomID: id
    };
    const messages = await service.find(null, filter);

    res.json({
      'success': true,
      'message': 'Estos son los mensajes encontrados',
      'Data': messages
    });

  } catch (error) {
    next(error);
  }

});
//CREATE PRODUCTS
router.post('/', ensureToken, validatorHandler(createMessageSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body;
    const message = await service.create(body);

    res.json({
      'success': true,
      'message': "El mensaje se ha creado con exito",
      'Data': message
    });
  } catch (error) {
    next(error);
  }

});

//rutas especificas /:id
//GET PRODUCTS BY ID
router.get('/:id', ensureToken, validatorHandler(getValidMessage, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;

    const message = await service.findOne(id);
    res.json({
      'success': true,
      'message': 'Este es el mensaje encontrado',
      'Data': message
    });
  } catch (error) {
    next(error);
  }
});

//PUT = TODOS LOS CAMPOS SE ACTUALIZAN
//PATCH =  ACTUALIZACION PARCIAL DE CAMPOS
//UPDATE
router.patch('/:id', ensureToken, validatorHandler(getValidMessage, 'params'), validatorHandler(updateMessageSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const { old, changed } = await service.update(id, data);
    res.json({
      'success': true,
      'message': "Se ha actualizado el siguiente mensaje",
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
router.delete('/:id', ensureToken, validatorHandler(getValidMessage, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await service.delete(id);
    res.json({
      'success': true,
      'message': "Se ha eliminado este mensaje",
      'Data': {
        "message": "Mensaje eliminado",
        "Data": message
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;