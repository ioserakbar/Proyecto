const express= require('express');
const router = express.Router();
const Service = require('../Services/schedule.service');
const service = new Service();
const validatorHandler = require('./../Middlewares/validator.handler')
const { createScheduleSchema, updateSheduleSchema, getValidShedule } = require('../Schemas/schedule.schema');


//GET ALL PRODUCTS
router.get('/', async (req, res, next) => {

  try{

    const {size} = req.query;
    const filter = req.body;
    const schedules = await service.find(size || 10, filter);
    res.json({
      'success': true,
      'message': 'Estos son los horarios encontrados',
      'Data': schedules
    });

  } catch (error){
    next(error);
  }

});
 
//CREATE PRODUCTS
router.post('/', validatorHandler(createScheduleSchema, 'body'), async (req, res, next) => {  
  try {
    const body = req.body;
    const schedule = await service.create(body);

    res.json({
      'success': true, 
      'message': "El horario se ha creado con exito", 
      'Data': schedule 
   });
  } catch (error) {
    next(error);
  }

});

//rutas especificas /:id
//GET PRODUCTS BY ID
router.get('/:id', validatorHandler(getValidShedule, 'params'),  async (req, res, next) => {
  try{
    const {id} = req.params;

    const schedule =  await service.findOne(id);
    res.json({
      'success': true,
      'message': 'Este es el horario encontrado',
      'Data': schedule
    });
  } catch (error){
    next(error);
  }
});

//PUT = TODOS LOS CAMPOS SE ACTUALIZAN
//PATCH =  ACTUALIZACION PARCIAL DE CAMPOS
//UPDATE
router.patch('/:id', validatorHandler(getValidShedule, 'params'), validatorHandler(updateSheduleSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const { old, changed} = await service.update(id, data);
    res.json({
      'success': true,
      'message': "Se ha actualizado el siguiente horario",
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
router.delete('/:id', validatorHandler(getValidShedule, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const schedule = await service.delete(id);
    res.json({
      'success': true,
      'message': "Se ha eliminado este horario",
      'Data': {
        "message": "Horario eliminado",
        "Data" : schedule
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;