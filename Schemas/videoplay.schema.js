const Joi = require('joi');

const id = Joi.string().uuid();
const date = Joi.date();
const gameID = Joi.string().uuid();
const userID = Joi.string().uuid();
const content = Joi.string().max(250);
const multimediaID = Joi.string().uuid();

const createVideoplaySchema = Joi.object({
  date:date.required(),
  gameID:gameID.required(),
  userID:userID.required(),
  conten: content,
  multimediaID: multimediaID.required()
});

const updateVideoplaySchema = Joi.object({
  date:date,
  gameID:gameID,
  userID:userID,
  conten: content,
  multimediaID: multimediaID
});

const getValidVideoplay = Joi.object({
  id:id.required()
});

module.exports = { createVideoplaySchema, updateVideoplaySchema, getValidVideoplay };