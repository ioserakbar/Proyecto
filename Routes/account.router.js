const express= require('express');
const router = express.Router();
const AccountService = require('../Services/account.service');
const service = new AccountService();
const validatorHandler = require('./../Middlewares/validator.handler')
const { createAccountSchema, updateAccountSchema, getValidAccount } = require('../Schemas/account.schema')


//GET ALL PRODUCTS
router.get('/',async (req, res, next) => {

  try{

    const {size} = req.query;
    const filter = req.body;
    
    const accounts = await service.find(size || 10, filter);
    res.json({
      'success': true,
      'message': 'Estas son las cuentas encontradas',
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
      'message': "La cuenta se ha creado con exito", 
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
      'message': 'Este es la cuenta encontrada',
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
      'message': "Se ha actualizado la siguiente cuenta",
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
        "Data" : account
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;