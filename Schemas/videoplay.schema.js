const Joi = require('joi');

const id = Joi.string();
const date = Joi.date();
const gameID = Joi.string();
const userID = Joi.string();
const content = Joi.string().max(250).min(0);
const multimedia = Joi.object().keys({
  name: Joi.string(),
  path: Joi.string(),
  extention: Joi.string().max(6)
});

const createVideoplaySchema = Joi.object({
  date: date.required(),
  gameID: gameID.required(),
  userID: userID.required(),
  content: content,
  multimedia: multimedia.required()
});

const updateVideoplaySchema = Joi.object({
  date: date,
  gameID: gameID,
  userID: userID,
  conten: content,
  multimedia: multimedia
});

const getValidVideoplay = Joi.object({
  id: id.required()
});

module.exports = {
  createVideoplaySchema,
  updateVideoplaySchema,
  getValidVideoplay
};