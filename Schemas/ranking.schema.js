const Joi = require('joi');

const id = Joi.string();
const gameID = Joi.string();
const name = Joi.string();
const image = Joi.string();
const index = Joi.number().integer();

const createCommentMultimediaSchema = Joi.object({
  gameID: gameID.required(),
  name: name.required(),
  image: image,
  index: index.required()
});

const updateCommentMultimediaSchema = Joi.object({
  gameID: gameID,
  name: name,
  iamge: image,
  index: index
});

const getValidCommentMultimedia = Joi.object({
  id:id.required()
});

module.exports = { createCommentMultimediaSchema, updateCommentMultimediaSchema, getValidCommentMultimedia };