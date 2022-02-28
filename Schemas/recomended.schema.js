const Joi = require('joi');

const id = Joi.string().uuid();
const recomndedeUser = Joi.string().uuid();
const userID = Joi.string().uuid();

const createRecomendedSchema = Joi.object({
  recomndedeUser: recomndedeUser.required(),
  userID: userID.required()
});

const updateRecomendedSchema = Joi.object({
  usuarioRecomendado: recomndedeUser,
  userID: userID
});

const getValidRecomended = Joi.object({
  id:id.required()
});

module.exports = { createRecomendedSchema, updateRecomendedSchema, getValidRecomended};