const express = require('express');
const router = express.Router();
const Service = require('../Services/game.service');
const service = new Service();
const validatorHandler = require('./../Middlewares/validator.handler')
const { createGameSchema, updateGameSchema, getValidGame } = require('../Schemas/game.schema');
const { MULTIMEDIAURL, MULTIMEDIAGAMEICON, MULTIMEDIARANKEDICON } = require('../consts.json');
const azureStorage = require('azure-storage');
const blobService = azureStorage.createBlobService();
const containerGame = MULTIMEDIAGAMEICON.split('/')[0];
const containerRanked = MULTIMEDIARANKEDICON.split('/')[0];
const streamifier = require('streamifier');
const faker = require('faker');

//GET ALL PRODUCTS
router.get('/', async (req, res, next) => {

  try {

    const { size } = req.query;
    const filter = req.body;
    const games = await service.find(size || 10, filter);
    res.json({
      'success': true,
      'message': 'Estos son los juegos encontrados',
      'Data': games
    });

  } catch (error) {
    next(error);
  }

});

//CREATE PRODUCTS
router.post('/', validatorHandler(createGameSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body;
    const { image } = body;
    let { name, path, extention } = image;

    name = faker.datatype.uuid() + name + "." + extention;

    let buffer = new Buffer(path, 'base64')
    var stream = streamifier.createReadStream(buffer);
    await blobService.createBlockBlobFromStream(containerGame, name, stream, buffer.byteLength, {
      contentType: extention
    }, async function (err) {
      if (err) {

        res.json({
          'success': false,
          'message': err
        });

      } else {

        const { ranking } = body;

        if (ranking.length !== 0) {
          const fileURL = `${MULTIMEDIAURL}${MULTIMEDIAGAMEICON}${name}`;


          image['name'] = name;
          image['extention'] = extention;
          image['path'] = fileURL;
          body['image'] = image;
          let forIndex = 0;
          let rankedArray = [];
          for (const ranked of ranking) {

            let { name, extention, path } = ranked.image;


            name = faker.datatype.uuid() + name + "." + extention;

            let buffer = new Buffer(path, 'base64')
            var stream = streamifier.createReadStream(buffer);
            await blobService.createBlockBlobFromStream(containerRanked, name, stream, buffer.byteLength, {
              contentType: extention
            }, async function (err) {
              if (err) {

                res.json({
                  'success': false,
                  'message': err
                });

              } else {

                const fileURL = `${MULTIMEDIAURL}${MULTIMEDIARANKEDICON}${name}`;
                var obj = {};
                obj['name'] = name;
                obj['extention'] = extention;
                obj['path'] = fileURL;

                var rank = {};
                rank.name = ranked.name;
                rank.index = ranked.index;
                rank.image = obj;

                rankedArray.push(rank);
                if (forIndex === ranking.length - 1) {
                  body['ranking'] = rankedArray;
                  const game = await service.create(body);
                  res.json({
                    'success': true,
                    'message': "El usuario se ha creado con exito",
                    'Data': game
                  });
                }
                forIndex++;
              }
              
            })
          };
        } else {
          const publication = await service.create(body);
          res.json({
            'success': true,
            'message': "El usuario se ha creado con exito",
            'Data': publication
          });
        }



      }

    })
  } catch (error) {
    next(error);
  }

});

//rutas especificas /:id
//GET PRODUCTS BY ID
router.get('/:id', validatorHandler(getValidGame, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;

    const game = await service.findOne(id);
    res.json({
      'success': true,
      'message': 'Este es el juego encontrado',
      'Data': game
    });
  } catch (error) {
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
    const { old, changed } = await service.update(id, data);
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
        "Data": game
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;