const Joi = require('joi');

const id = Joi.string();
const date = Joi.date();
const content = Joi.string().min(1).max(1000);
const userId = Joi.string();
const multimedia = Joi.array().items(
  Joi.object().keys({
    name: Joi.string(),
    path: Joi.string(),
    extention: Joi.string().max(6)
  })
);

const createPublicationSchema = Joi.object({
  date: date.required(),
  content: content.required(),
  userID: userId.required(),
  multimedia: multimedia
});

const updatePublicationSchema = Joi.object({
  date: date,
  content: content,
  userId: userId,
  multimedia: multimedia
});

const getValidPublication = Joi.object({
  id:id.required()
});

module.exports = { createPublicationSchema, updatePublicationSchema, getValidPublication };