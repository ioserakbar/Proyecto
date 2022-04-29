const Joi = require('joi');

const id = Joi.string();
const date = Joi.date();
const content = Joi.string().min(0).max(5000);
const userId = Joi.string();
const multimedia = Joi.array().items(
  Joi.object().keys({
    name: Joi.string(),
    path: Joi.string(),
    extention: Joi.string().max(6)
  })
);
const stats = Joi.array().items(
  Joi.object().keys({
    userID: Joi.string(),
    like: Joi.boolean(),
    dislike: Joi.boolean()
  })
);

const createPublicationSchema = Joi.object({
  date: date.required(),
  content: content,
  userID: userId.required(),
  stats: stats,
  multimedia: multimedia
});

const updatePublicationSchema = Joi.object({
  date: date,
  content: content,
  userId: userId,
  stats: stats,
  multimedia: multimedia
});

const getValidPublication = Joi.object({
  id:id.required()
});

module.exports = { createPublicationSchema, updatePublicationSchema, getValidPublication };