const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  id: String,
  name: String,
  developers: String,
  image: Object,
  ranking: Array
})

const modelGame = mongoose.model('game', gameSchema);
module.exports = modelGame;

/**const id = Joi.string().uuid();
const name = Joi.string().min(2).max(25);
const developers = Joi.string().min(2).max(30);
const image = Joi.string().max(255); */