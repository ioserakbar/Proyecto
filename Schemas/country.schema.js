const Joi = require('joi');

const id = Joi.string();
const name = Joi.string().min(4).max(50);
const flagImage = Joi.object().keys({
  name: Joi.string(),
  path: Joi.string(),
  extention: Joi.string().max(6)
});

const createCountrySchema = Joi.object({
  name: name.required(),
  flagImage:flagImage
});

const updateCountrySchema = Joi.object({
  name: name,
  flagImage:flagImage
});

const getValidCountry = Joi.object({
  id:id.required()
});

module.exports = { createCountrySchema, updateCountrySchema, getValidCountry };