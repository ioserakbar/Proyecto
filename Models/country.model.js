const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.set('debug', true);
const countrySchema = new Schema({
  id: String,
  name: String,
  flagImage: Array
})

const modelCountry = mongoose.model('country', countrySchema);
module.exports = modelCountry;

/**const id = Joi.string().uuid();
const name = Joi.string().min(4).max(50);
const flag = Joi.string(); */