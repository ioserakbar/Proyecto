const Joi = require('joi');

const id = Joi.string();
const userID = Joi.string();
const email = Joi.string().email();
const type = Joi.string().alphanum().min(3).max(20);

const createLinkedAccountSchema = Joi.object({
  userID: userID.required(),
  email: email.required(),
  type:type.required()
});
const updateLinkedAccountSchema = Joi.object({
  userID: userID,
  email: email,
  type:type
});

const getValidLinkedAccount = Joi.object({
  id:id.required()
});

module.exports = { createLinkedAccountSchema, updateLinkedAccountSchema, getValidLinkedAccount };