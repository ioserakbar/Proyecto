const Joi = require('joi');

const id = Joi.string().uuid();
const gameID = Joi.string().uuid();
const name = Joi.string();
const image = Joi.string();
const index = Joi.number().integer();

const createCommentMultimediaSchema = Joi.object({
  gameID: gameID.required(),
  name: name.required(),
  iamge: image,
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