const Joi = require('joi');

const id = Joi.string();
const userOne = Joi.string();
const userTwo = Joi.string();
const date = Joi.date();

const createFriendchema = Joi.object({
  userOne: userOne.required(),
  userTwo: userTwo.required(),
  date: date.required()
});

const updateFriendSchema = Joi.object({
  userOne: userOne,
  userTwo: userTwo,
  date: date
});

const getValidFriend = Joi.object({
  id:id.required()
});

module.exports = { createFriendchema, updateFriendSchema, getValidFriend };