const Joi = require('joi');



const id = Joi.string().uuid();
const lunes = Joi.string().pattern(/^([0-9]{2}[:][0-9]{2}[ ]{1}[-]{1}[ ]{1}[0-9]{2}[:][0-9]{2})$/).min(13).max(13);
const martes = Joi.string().pattern(/^([0-9]{2}[:][0-9]{2}[ ]{1}[-]{1}[ ]{1}[0-9]{2}[:][0-9]{2})$/).min(13).max(13);
const miercoles = Joi.string().pattern(/^([0-9]{2}[:][0-9]{2}[ ]{1}[-]{1}[ ]{1}[0-9]{2}[:][0-9]{2})$/).min(13).max(13);
const jueves = Joi.string().pattern(/^([0-9]{2}[:][0-9]{2}[ ]{1}[-]{1}[ ]{1}[0-9]{2}[:][0-9]{2})$/).min(13).max(13);
const viernes = Joi.string().pattern(/^([0-9]{2}[:][0-9]{2}[ ]{1}[-]{1}[ ]{1}[0-9]{2}[:][0-9]{2})$/).min(13).max(13);
const sabado = Joi.string().pattern(/^([0-9]{2}[:][0-9]{2}[ ]{1}[-]{1}[ ]{1}[0-9]{2}[:][0-9]{2})$/).min(13).max(13);
const domingo = Joi.string().pattern(/^([0-9]{2}[:][0-9]{2}[ ]{1}[-]{1}[ ]{1}[0-9]{2}[:][0-9]{2})$/).min(13).max(13);

const createScheduleSchema = Joi.object({
  lunes:lunes,
  martes:martes,
  miercoles:miercoles,
  jueves:jueves,
  viernes:viernes,
  sabado:sabado,
  domingo:domingo
});

const updateSheduleSchema = Joi.object({
  lunes:lunes,
  martes:martes,
  miercoles:miercoles,
  jueves:jueves,
  viernes:viernes,
  sabado:sabado,
  domingo:domingo
});

const getValidShedule = Joi.object({
  id:id.required()
});

module.exports = { createScheduleSchema, updateSheduleSchema, getValidShedule};