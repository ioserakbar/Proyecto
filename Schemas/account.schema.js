const Joi = require('joi');

const id = Joi.string().uuid();
const user = Joi.string().uuid();
const password = Joi.string();
const email = Joi.string().email();
const userID = Joi.string().uuid();

const createAccountSchema = Joi.object({
  user:user.required(),
  password:password.required(),
  email:email.required(),
  userID: userID.required()
});

const updateAccountSchema = Joi.object({
  user:user,
  password:password,
  email:email,
  userID: userID
});

const getValidAccount = Joi.object({
  id:id.required()
});

const getValidAccountUser= Joi.object({
  id:id.required()
});

module.exports = { createAccountSchema, updateAccountSchema, getValidAccount, getValidAccountUser};