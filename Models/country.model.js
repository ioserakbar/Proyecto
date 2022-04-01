const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const  countrySchema = new Schema ({
  id:String,
  name:String,
  flag:String
})

const modelCountry = mongoose.model('country', countrySchema);
module.exports = modelCountry;

/**const id = Joi.string().uuid();
const name = Joi.string().min(4).max(50);
const flag = Joi.string(); */