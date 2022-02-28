const Joi = require('joi');

const id = Joi.string().uuid();
const path = Joi.string();
const extention = Joi.string().min(3).max(4);

const createMultimediaSchema = Joi.object({
  path: path.required(),
  extention: extention.required()
});

const updateMultimediaSchema = Joi.object({
  path: path,
  extention: extention
});

const getValidMultimedia = Joi.object({
  id:id.required()
});

module.exports = { createMultimediaSchema, updateMultimediaSchema, getValidMultimedia };