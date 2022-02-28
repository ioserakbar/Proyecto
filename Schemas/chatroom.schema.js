const Joi = require('joi');

const id = Joi.string().uuid();
const userOne = Joi.string().uuid();
const userTwo = Joi.string().uuid();

const createChatroomSchema = Joi.object({
  userOne: userOne.required(),
  userTwo: userTwo.required()
});

const updateChatroomSchema = Joi.object({
  userOne: userOne,
  userTwo: userTwo
});

const getValidChatroom = Joi.object({
  id:id.required()
});

module.exports = { createChatroomSchema, updateChatroomSchema, getValidChatroom };