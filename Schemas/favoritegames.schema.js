const Joi = require('joi');

const id = Joi.string();
const gameID = Joi.string();
const userID = Joi.string();
const ranked = Joi.string();
const timePlayed = Joi.string();

const createFavoriteGameSchema = Joi.object({
  gameID: gameID.required(),
  userID: userID.required(),
  ranked: ranked,
  timePlayed: timePlayed.required()
});

const updateFavoriteGameSchema = Joi.object({
  gameID: gameID,
  userID: userID,
  ranked: ranked,
  timePlayed: timePlayed
});

const getValidFavoriteGame = Joi.object({
  id:id.required()
});

module.exports = { createFavoriteGameSchema, updateFavoriteGameSchema, getValidFavoriteGame };