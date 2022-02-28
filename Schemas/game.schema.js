const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(2).max(25);
const developers = Joi.string().min(2).max(30);
const image = Joi.string().max(255);

const createGameSchema = Joi.object({
  name: name.required(),
  developers:developers.required(),
  image:image
});

const updateGameSchema = Joi.object({
  name: name,
  developers:developers,
  image:image
});

const getValidGame = Joi.object({
  id:id.required()
});



module.exports = { createGameSchema, updateGameSchema, getValidGame };