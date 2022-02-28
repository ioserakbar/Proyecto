const express= require('express');
const router = express.Router();
const AccountService = require('../Services/account.service');
const service = new AccountService();
const validatorHandler = require('./../Middlewares/validator.handler')
const { createAccountSchema, updateAccountSchema, getValidAccount } = require('../Schemas/account.schema')


//GET ALL PRODUCTS
router.get('/', (req, res, next) => {

  try{

    const {size} = req.query;
    const accounts = service.find(size || 10)
    res.json({
      'success': true,
      'message': 'Estos son los productos encontrados',
      'Data': accounts
    });

  } catch (error){
    next(error);
  }

});
 
//CREATE PRODUCTS
router.post('/', validatorHandler(createAccountSchema, 'body'), (req, res, next) => {  
  try {
    const body = req.body;
    const account = service.create(body);

    res.json({
      'success': true, 
      'message': "El producto se ha creado con exito", 
      'Data': account 
   });
  } catch (error) {
    next(error);
  }

});

//rutas especificas /:id
//GET PRODUCTS BY ID
router.get('/:id', validatorHandler(getValidAccount, 'params'),  (req, res, next) => {
  try{
    const {id} = req.params;

    const account =  service.findOne(id);
    res.json({
      'success': true,
      'message': 'Este es el producto encontrado',
      'Data': account
    });
  } catch (error){
    next(error);
  }
});

//PUT = TODOS LOS CAMPOS SE ACTUALIZAN
//PATCH =  ACTUALIZACION PARCIAL DE CAMPOS
//UPDATE
router.patch('/:id', validatorHandler(getValidAccount, 'params'), validatorHandler(updateAccountSchema, 'body'), (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const { old, changed} = service.update(id, data);
    res.json({
      'success': true,
      'message': "Se ha actualizado el siguiente registro",
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
router.delete('/:id', validatorHandler(getValidAccount, 'params'), (req, res, next) => {
  try {
    const { id } = req.params;
    const account = service.delete(id);
    res.json({
      'success': true,
      'message': "Se ha eliminado esta cuenta",
      'Data': {
        "message": "Cuenta eliminado",
        "product" : account
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;