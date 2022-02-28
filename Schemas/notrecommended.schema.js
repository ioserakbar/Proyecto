const Joi = require('joi');

const id = Joi.string().uuid();
const notRecommendeUser = Joi.string().uuid();
const userID = Joi.string().uuid();

const createNotRecommendedSchema = Joi.object({
  notRecommendeUser: notRecommendeUser.required(),
  userID: userID.required()
});

const updateNotRecommendedSchema = Joi.object({
  notRecommendeUser: notRecommendeUser,
  userID: userID
});

const getValidNotRecommended = Joi.object({
  id:id.required()
});

module.exports = { createNotRecommendedSchema, updateNotRecommendedSchema, getValidNotRecommended };