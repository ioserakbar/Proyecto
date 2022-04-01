const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const  favoriteGameSchema = new Schema ({
  id:String,
  gameID:String,
  userID:String,
  ranked: String,
  timePlayed:String
})

const modelFavoriteGame = mongoose.model('favoriteGame', favoriteGameSchema);
module.exports = modelFavoriteGame;

/**const id = Joi.string().uuid();
const gameID = Joi.string().uuid();
const userID = Joi.string().uuid();
const ranked = Joi.string();
const timePlayed = Joi.string(); */