const express = require('express');
const router = express.Router();
const Service = require('../Services/user.service');
const service = new Service();
const validatorHandler = require('./../Middlewares/validator.handler')
const { createUserSchema, updateUserSchema, getValidUser } = require('../Schemas/user.schema');
const faker = require('faker');
const { MULTIMEDIAURL, MULTIMEDIAPROFILEPICS } = require('../consts.json');
const azureStorage = require('azure-storage');
const blobService = azureStorage.createBlobService();
const containerName = 'profilepics';


//GET ALL PRODUCTS
router.get('/', async (req, res, next) => {

  try {

    const { size, e, p } = req.query;
    const filter = {};

    if (e) {
      Object.assign(filter, {
        email: e
      })
    }

    if (p) {
      Object.assign(filter, {
        password: p
      })
    }

    const users = await service.find(size || 10, filter)
    res.json({
      'success': true,
      'message': 'Estos son los usuarios encontrados',
      'Data': users
    });

  } catch (error) {
    next(error);
  }

});
//rutas especificas /:id
//GET PRODUCTS BY ID
router.get('/:id', validatorHandler(getValidUser, 'params'), async (req, res, next) => {

  try {

    const { id } = req.params;
    const user = await service.findOne(id);

    res.json({
      'success': true,
      'message': 'Este es el usuario encontrado',
      'Data': user
    });
  } catch (error) {
    next(error);
  }

});

//CREATE PRODUCTS
router.post('/', validatorHandler(createUserSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body;

    const { profilePic } = body;

    var name = null, path = null, extention = null;

    if (profilePic) {

      ({ name, path, extention } = profilePic);

      name = faker.datatype.uuid() + name + "." + extention;

      let buffer = new Buffer(path, 'base64')
      await blobService.createBlockBlobFromText(containerName, name, buffer, {
        contentType: extention
      }, async function (err, result, response) {
        if (err) {

          res.json({
            'success': false,
            'message': err
          });

        } else {

          const fileURL =`${MULTIMEDIAURL}${MULTIMEDIAPROFILEPICS}/${name}`;

          body["profilePic"]["path"] = fileURL;
          const user = await service.create(body);

          res.json({
            'success': true,
            'message': "El usuario se ha creado con exito",
            'Data': user
          });

        }

      })



    } else {
      const user = await service.create(body);

      res.json({
        'success': true,
        'message': "El usuario se ha creado con exito",
        'Data': user
      });
    }



  } catch (error) {
    next(error);
  }

});



//PUT = TODOS LOS CAMPOS SE ACTUALIZAN
//PATCH =  ACTUALIZACION PARCIAL DE CAMPOS
//UPDATE
router.patch('/:id', validatorHandler(getValidUser, 'params'), validatorHandler(updateUserSchema, 'body'), async (req, res, next) => {

  try {
    const { id } = req.params;
    const data = req.body;
    const { old, changed } = await service.update(id, data);
    res.json({

      'success': true,
      'message': "Se ha actualizado el siguiente usuario",
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
router.delete('/:id', validatorHandler(getValidUser, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.delete(id);
    res.json({
      'success': true,
      'message': "Se ha eliminado este usuario",
      'Data': {
        "message": "Usuario eliminado",
        "product": user
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;