const express = require('express');
const router = express.Router();
const Service = require('../Services/comment.service');
const service = new Service();
const validatorHandler = require('./../Middlewares/validator.handler')
const { createCommentchema, updateCommentSchema, getValidComment } = require('../Schemas/comment.schema');


//GET ALL PRODUCTS
router.get('/', async (req, res, next) => {

  try {

    const { size } = req.query;
    const filter = req.body;
    const comments = await service.find(size || 10, filter);
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
    const comment = await service.create(body);

    res.json({
      'success': true,
      'message': "El comentario se ha creado con exito",
      'Data': comment
    });
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