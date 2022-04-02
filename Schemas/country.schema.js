const Joi = require('joi');

const id = Joi.string();
const name = Joi.string().min(4).max(50);
const flag = Joi.string();

const createCountrySchema = Joi.object({
  name: name.required(),
  flag:flag
});

const updateCountrySchema = Joi.object({
  name: name,
  flag:flag
});

const getValidCountry = Joi.object({
  id:id.required()
});

module.exports = { createCountrySchema, updateCountrySchema, getValidCountry };