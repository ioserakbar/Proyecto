const Joi = require('joi');

const id = Joi.string().uuid();
const notRecomndedeUser = Joi.string().uuid();
const userID = Joi.string().uuid();

const createNotRecomendedSchema = Joi.object({
  notRecomndedeUser: notRecomndedeUser.required(),
  userID: userID.required()
});

const updateNotRecomendedSchema = Joi.object({
  notRecomndedeUser: notRecomndedeUser,
  userID: userID
});

const getValidNotRecomended = Joi.object({
  id:id.required()
});

module.exports = { createNotRecomendedSchema, updateNotRecomendedSchema, getValidNotRecomended};