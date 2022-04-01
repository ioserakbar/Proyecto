const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const  scheduleSchema = new Schema ({
  id:String,
  lunes:String,
  martes:String,
  miercoles:String,
  jueves:String,
  viernes:String,
  sabado:String,
  domingo:String,
})

const modelSchedule= mongoose.model('schedule', scheduleSchema);
module.exports = modelSchedule;


/**const id = Joi.string().uuid();
const lunes = Joi.string().pattern(/^([0-9]{2}[:][0-9]{2}[ ]{1}[-]{1}[ ]{1}[0-9]{2}[:][0-9]{2})$/).min(13).max(13);
const martes = Joi.string().pattern(/^([0-9]{2}[:][0-9]{2}[ ]{1}[-]{1}[ ]{1}[0-9]{2}[:][0-9]{2})$/).min(13).max(13);
const miercoles = Joi.string().pattern(/^([0-9]{2}[:][0-9]{2}[ ]{1}[-]{1}[ ]{1}[0-9]{2}[:][0-9]{2})$/).min(13).max(13);
const jueves = Joi.string().pattern(/^([0-9]{2}[:][0-9]{2}[ ]{1}[-]{1}[ ]{1}[0-9]{2}[:][0-9]{2})$/).min(13).max(13);
const viernes = Joi.string().pattern(/^([0-9]{2}[:][0-9]{2}[ ]{1}[-]{1}[ ]{1}[0-9]{2}[:][0-9]{2})$/).min(13).max(13);
const sabado = Joi.string().pattern(/^([0-9]{2}[:][0-9]{2}[ ]{1}[-]{1}[ ]{1}[0-9]{2}[:][0-9]{2})$/).min(13).max(13);
const domingo = Joi.string().pattern(/^([0-9]{2}[:][0-9]{2}[ ]{1}[-]{1}[ ]{1}[0-9]{2}[:][0-9]{2})$/).min(13).max(13); */