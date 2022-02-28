const express= require('express');
const router = express.Router();
const Service = require('../Services/linkedAccount.service');
const service = new Service();
const validatorHandler = require('./../Middlewares/validator.handler')
const {  createLinkedAccountSchema, updateLinkedAccountSchema, getValidLinkedAccount  } = require('../Schemas/linkedAccount.schema');


//GET ALL PRODUCTS
router.get('/', (req, res, next) => {

  try{

    const {size} = req.query;
    const linkedAccounts = service.find(size || 10)
    res.json({
      'success': true,
      'message': 'Estas son las cuentas linkeadas encontradas',
      'Data': linkedAccounts
    });

  } catch (error){
    next(error);
  }

});
 
//CREATE PRODUCTS
router.post('/', validatorHandler(createLinkedAccountSchema, 'body'), (req, res, next) => {  
  try {
    const body = req.body;
    const linkedAccount = service.create(body);

    res.json({
      'success': true, 
      'message': "La cuenta linkeada se ha creado con exito", 
      'Data': linkedAccount 
   });
  } catch (error) {
    next(error);
  }

});

//rutas especificas /:id
//GET PRODUCTS BY ID
router.get('/:id', validatorHandler(getValidLinkedAccount, 'params'),  (req, res, next) => {
  try{
    const {id} = req.params;

    const linkedAccount =  service.findOne(id);
    res.json({
      'success': true,
      'message': 'Este es la cuenta linkeada encontrada',
      'Data': linkedAccount
    });
  } catch (error){
    next(error);
  }
});

//PUT = TODOS LOS CAMPOS SE ACTUALIZAN
//PATCH =  ACTUALIZACION PARCIAL DE CAMPOS
//UPDATE
router.patch('/:id', validatorHandler(getValidLinkedAccount, 'params'), validatorHandler(updateLinkedAccountSchema, 'body'), (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const { old, changed} = service.update(id, data);
    res.json({
      'success': true,
      'message': "Se ha actualizado la siguiente cuenta linkeada",
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
router.delete('/:id', validatorHandler(getValidLinkedAccount, 'params'), (req, res, next) => {
  try {
    const { id } = req.params;
    const linkedAccount = service.delete(id);
    res.json({
      'success': true,
      'message': "Se ha eliminado esta cuenta linkeada",
      'Data': {
        "message": "Cuenta linkeada eliminada",
        "Data" : linkedAccount
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;