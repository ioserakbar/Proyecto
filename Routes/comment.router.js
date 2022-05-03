const express = require('express');
const router = express.Router();
const Service = require('../Services/comment.service');
const service = new Service();
const validatorHandler = require('./../Middlewares/validator.handler')
const { createCommentchema, updateCommentSchema, getValidComment } = require('../Schemas/comment.schema');
const { MULTIMEDIAURL, MULTIMEDIACOMMENTS } = require('../consts.json');
const azureStorage = require('azure-storage');
const blobService = azureStorage.createBlobService();
const container = MULTIMEDIACOMMENTS.split('/')[0];
const streamifier = require('streamifier');
const faker = require('faker');

//GET ALL PRODUCTS
router.get('/', async (req, res, next) => {

  try {

    const { size } = req.query;
    const filter = req.body;
    const comments = await service.find(size, filter);
    res.json({
      'success': true,
      'message': 'Estos son los comentarios encontrados',
      'Data': comments
    });

  } catch (error) {
    next(error);
  }

});

//CREATE PRODUCTS
router.post('/', validatorHandler(createCommentchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body;


    const { multimedia } = body;

    //const recommended = await service.create(body);
    if (multimedia) {

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

          const fileURL = `${MULTIMEDIAURL}${MULTIMEDIACOMMENTS}${name}`;


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


    } else {
      const comment = await service.create(body);

      res.json({
        'success': true,
        'message': "El usuario se ha creado con exito",
        'Data': comment
      });
    }
  } catch (error) {
    next(error);
  }

});

//rutas especificas /:id
//GET PRODUCTS BY ID
router.get('/:id', validatorHandler(getValidComment, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;

    const comment = await service.findOne(id);
    res.json({
      'success': true,
      'message': 'Este es el comentario encontrado',
      'Data': comment
    });
  } catch (error) {
    next(error);
  }
});

//get comments by publication id
router.get('/publication/:id', validatorHandler(getValidComment, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const filter = {
      publicationID: id
    }
    const comment = await service.find(100, filter);
    res.json({
      'success': true,
      'message': 'Este es el comentario encontrado',
      'Data': comment
    });
  } catch (error) {
    next(error);
  }
});

//PUT = TODOS LOS CAMPOS SE ACTUALIZAN
//PATCH =  ACTUALIZACION PARCIAL DE CAMPOS
//UPDATE
router.patch('/:id', validatorHandler(getValidComment, 'params'), validatorHandler(updateCommentSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const { old, changed } = await service.update(id, data);
    res.json({
      'success': true,
      'message': "Se ha actualizado el siguiente comentario",
      'Data': {
        "Original": old,
        "Modificado": changed
      }
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/statsChange', async (req, res, next) => {
  try {

    const { id } = req.params;
    const { statOption, userID } = req.body;
    const comment = await service.findOne(id);
    const stats = comment.stats;
    let index = 0;
    let toAdd = {};
    let type = '';
    let indexToRemove = 0;
    if (stats.length > 0) {
      stats.forEach(stat => {
        if (stat.userID === userID) {
          if (statOption === 'like') {
            stat.like = true;
            stat.dislike = false;
          } else if (statOption === 'dislike') {
            stat.like = false;
            stat.dislike = true;
          } else if (statOption === 'delete') {
            type = 'remove';
            indexToRemove = index;
          }
        }
        else if (index === stats.length - 1) {
          toAdd.userID = userID;
          if (statOption === 'like') {
            toAdd.like = true;
            toAdd.dislike = false;
          } else if (statOption === 'dislike') {
            toAdd.like = false;
            toAdd.dislike = true;
          }
          type = 'add';
        }
        index++;
      });
    } else {
      toAdd.userID = userID;
      if (statOption === 'like') {
        toAdd.like = true;
        toAdd.dislike = false;
      } else if (statOption === 'dislike') {
        toAdd.like = false;
        toAdd.dislike = true;
      } else {
        toAdd.like = false;
        toAdd.dislike = false;
      }
      type = 'add';
    }

    let data = { stats: stats };
    if (type === 'add') {
      data.stats.push(toAdd);
    } else if (type === 'remove') {
      data.stats.splice(indexToRemove, 1);
    }

    const { old, changed } = await service.update(id, data);
    res.json({
      'success': true,
      'message': "Se ha actualizado la publicacion encontrada",
      'Data': {
        "Original": old.stats,
        "Modificado": changed.stats
      }
    });


  } catch (error) {
    next(error);
  }
});

//DELETE
router.delete('/:id', validatorHandler(getValidComment, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await service.delete(id);
    res.json({
      'success': true,
      'message': "Se ha eliminado este comentario",
      'Data': {
        "message": "Comentario eliminado",
        "Data": comment
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;