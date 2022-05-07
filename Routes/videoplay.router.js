const express = require('express');
const router = express.Router();
const Service = require('../Services/videoplay.service');
const service = new Service();
const validatorHandler = require('./../Middlewares/validator.handler')
const { createVideoplaySchema, updateVideoplaySchema, getValidVideoplay } = require('../Schemas/videoplay.schema');
const { MULTIMEDIAURL, MULTIMEDIAPLAYS } = require('../consts.json');
const azureStorage = require('azure-storage');
const blobService = azureStorage.createBlobService();
const container = MULTIMEDIAPLAYS.split('/')[0];
const streamifier = require('streamifier');
const faker = require('faker');

//GET ALL PRODUCTS
router.get('/', async (req, res, next) => {

  try {

    const { size } = req.query;
    const filter = req.body;
    const videoplays = await service.find(size || 10, filter)
    res.json({
      'success': true,
      'message': 'Estas son las plays encontrados',
      'Data': videoplays
    });

  } catch (error) {
    next(error);
  }

});

//CREATE PRODUCTS
router.post('/', validatorHandler(createVideoplaySchema, 'body'), async (req, res, next) => {
  try {

    const body = req.body;
    const { multimedia } = body;
    let { name, path, extention } = multimedia;

    name = faker.datatype.uuid() + name + "." + extention;

    let buffer = new Buffer(path, 'base64')
    var stream = streamifier.createReadStream(buffer);
    await blobService.createBlockBlobFromStream(container, name, stream, buffer.byteLength, {
      contentType: extention
    }, async function (err) {
      if (err) {

        res.json({
          'success': false,
          'message': err
        });

      } else {

        const fileURL = `${MULTIMEDIAURL}${MULTIMEDIAPLAYS}${name}`;


        multimedia['name'] = name;
        multimedia['extention'] = extention;
        multimedia['path'] = fileURL;
        
        body['multimedia'] = multimedia;
        const comment = await service.create(body);
        res.json({
          'success': true,
          'message': "El usuario se ha creado con exito",
          'Data': comment
        });
      }

    })
  } catch (error) {
    next(error);
  }

});

//rutas especificas /:id
//GET PRODUCTS BY ID
router.get('/:id', validatorHandler(getValidVideoplay, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;

    const videoplay = await service.findOne(id);
    res.json({
      'success': true,
      'message': 'Esta es la play encontrado',
      'Data': videoplay
    });
  } catch (error) {
    next(error);
  }
});

//get plays by user
router.get('/user/:id', validatorHandler(updateVideoplaySchema, 'body'), async (req, res, next) => {

  try {

    const { id } = req.params;
    const filter = { userID: id };
    const play = await service.find(null, filter);

    res.json({
      'success': true,
      'message': 'Esta es la jugada encontrada',
      'Data': play
    });

  } catch (error) {
    next(error);
  }

});



//PUT = TODOS LOS CAMPOS SE ACTUALIZAN
//PATCH =  ACTUALIZACION PARCIAL DE CAMPOS
//UPDATE
router.patch('/:id', validatorHandler(getValidVideoplay, 'params'), validatorHandler(updateVideoplaySchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const { old, changed } = await service.update(id, data);
    res.json({
      'success': true,
      'message': "Se ha actualizado la siguiente play",
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
router.delete('/:id', validatorHandler(getValidVideoplay, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const videoplay = await service.delete(id);
    res.json({
      'success': true,
      'message': "Se ha eliminado esta play",
      'Data': {
        "message": "Play eliminada",
        "Data": videoplay
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;