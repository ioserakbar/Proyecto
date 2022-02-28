const Joi = require('joi');

const id = Joi.string().uuid();
const date = Joi.date();
const content = Joi.string().min(1).max(1000);
const userId = Joi.string().uuid();

const createPublicationSchema = Joi.object({
  date: date.required(),
  content: content.required(),
  userId: userId.required()
});

const updatePublicationSchema = Joi.object({
  date: date,
  content: content,
  userId: userId
});

const getValidPublication = Joi.object({
  id:id.required()
});

module.exports = { createPublicationSchema, updatePublicationSchema, getValidPublication };