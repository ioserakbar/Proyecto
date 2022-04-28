const express = require('express');
const router = express.Router();
const Service = require('../Services/publication.service');
const service = new Service();
const validatorHandler = require('./../Middlewares/validator.handler')
const { createPublicationSchema, updatePublicationSchema, getValidPublication } = require('../Schemas/publication.schema');
const faker = require('faker');
const { MULTIMEDIAURL, MULTIMEDIAPUBLICATIONS } = require('../consts.json');
const azureStorage = require('azure-storage');
const blobService = azureStorage.createBlobService();
const container = MULTIMEDIAPUBLICATIONS.split('/')[0];
const  streamifier = require('streamifier');
//GET ALL PRODUCTS
router.get('/', async (req, res, next) => {

  try {

    const { size } = req.query;
    const filter = req.body;
    const recommendeds = await service.find(size || 10, filter);
    res.json({
      'success': true,
      'message': 'Estas son las publicaciones encontradas',
      'Data': recommendeds
    });

  } catch (error) {
    next(error);
  }

});

//CREATE PRODUCTS
router.post('/', validatorHandler(createPublicationSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body;


    const { multimedia } = body;

    //const recommended = await service.create(body);
    if (multimedia) {
      let multis = []
      let index = 0;
      for (const multi of multimedia) {

        let { name, path, extention } = multi;

        name = faker.datatype.uuid() + name + "." + extention;

        let buffer = new Buffer(path, 'base64')
        var stream = streamifier.createReadStream(buffer);
        await blobService.createBlockBlobFromStream(container, name ,stream, buffer.byteLength, {
          contentType: extention
        }, async function (err) {
          if (err) {

            res.json({
              'success': false,
              'message': err
            });

          } else {

            const fileURL = `${MULTIMEDIAURL}${MULTIMEDIAPUBLICATIONS}${name}`;
            var obj = {};
            obj['name'] = name;
            obj['extention'] = extention;
            obj['path'] = fileURL;
            multis[`${index}`] = obj;
            if(index === multimedia.length - 1){
              body['multimedia'] = multis;
              const publication = await service.create(body);
              res.json({
                'success': true,
                'message': "El usuario se ha creado con exito",
                'Data': publication
              });
            }
            index++;
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
  } catch (error) {
    next(error);
  }

});

//rutas especificas /:id
//GET PRODUCTS BY ID
router.get('/:id', validatorHandler(getValidPublication, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;

    const recommended = await service.findOne(id);
    res.json({
      'success': true,
      'message': 'Esta es la publicacion encontrada',
      'Data': recommended
    });
  } catch (error) {
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
    const { old, changed } = await service.update(id, data);
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
        "Data": recommended
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;