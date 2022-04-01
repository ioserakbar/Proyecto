const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const  multimediaSchema = new Schema ({
  id:String,
  path:String,
  extention:String
})

const modelMultimedia = mongoose.model('multimedia', multimediaSchema);
module.exports = modelMultimedia;


/**const id = Joi.string().uuid();
const path = Joi.string();
const extention = Joi.string().min(3).max(5); */