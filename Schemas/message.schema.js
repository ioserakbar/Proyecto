const Joi = require('joi');

const id = Joi.string();
const content = Joi.string().min(1).max(250);
const multimediaID = Joi.string();
const date = Joi.date();
const userSenderID = Joi.string();
const chatRoomID = Joi.string();
const seen = Joi.bool();

const createMessageSchema = Joi.object({
  content: content.required(),
  multimediaID: multimediaID,
  date: date.required(),
  userSenderID: userSenderID.required(),
  chatRoomID: chatRoomID.required(),
  seen: seen
});

const updateMessageSchema = Joi.object({
  content: content,
  multimediaID: multimediaID,
  date: date,
  userSenderID: userSenderID,
  chatRoomID: chatRoomID,
  seen: seen
});

const getValidMessage = Joi.object({
  id:id.required()
});

module.exports = { createMessageSchema, updateMessageSchema, getValidMessage };