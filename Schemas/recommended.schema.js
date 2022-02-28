const Joi = require('joi');

const id = Joi.string().uuid();
const recommendedUser = Joi.string().uuid();
const userID = Joi.string().uuid();

const createRecommendedSchema = Joi.object({
  recommendedUser: recommendedUser.required(),
  userID: userID.required()
});

const updateRecommendedSchema = Joi.object({
  recommendedUser: recommendedUser,
  userID: userID
});

const getValidRecommended = Joi.object({
  id:id.required()
});

module.exports = { createRecommendedSchema, updateRecommendedSchema, getValidRecommended};