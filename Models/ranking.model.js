const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const  rankingSchema = new Schema ({
  id:String,
  gameID:String,
  name:String,
  image:String,
  index:Number
})

const modelRanking = mongoose.model('ranking', rankingSchema);
module.exports = modelRanking;


/**const id = Joi.string().uuid();
const gameID = Joi.string().uuid();
const name = Joi.string();
const image = Joi.string();
const index = Joi.number().integer(); */