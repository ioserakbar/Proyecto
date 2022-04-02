const Joi = require('joi');

const id = Joi.string();
const recommendedUser = Joi.string();
const userID = Joi.string();

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