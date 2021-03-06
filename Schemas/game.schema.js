const Joi = require('joi');

const id = Joi.string();
const name = Joi.string().min(2).max(25);
const developers = Joi.string().min(2).max(30);
const image = Joi.string().max(255);
const ranking = Joi.array().items(
  Joi.object().keys({
    name: Joi.string(),
    image: Joi.object().keys({
      name: Joi.string(),
      path: Joi.string(),
      extention: Joi.string().max(6)
    }),
    index: Joi.number().integer(),
    group: Joi.number().integer()
  })
);

const createGameSchema = Joi.object({
  name: name.required(),
  developers: developers.required(),
  image: image,
  ranking: ranking
});

const updateGameSchema = Joi.object({
  name: name,
  developers: developers,
  image: image,
  ranking: ranking
});

const getValidGame = Joi.object({
  id: id.required()
});



module.exports = {
  createGameSchema,
  updateGameSchema,
  getValidGame
};