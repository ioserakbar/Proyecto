const Joi = require('joi');

const id = Joi.string().uuid();
const content = Joi.string().min(1).max(250);
const multimediaID = Joi.string().uuid();
const date = Joi.date();
const hour = Joi.string().pattern(/^([0-9]{2}):([0-9]{2})$/);
const userSenderID = Joi.string().uuid();
const chatRoomID = Joi.string().uuid();

const createMessageSchema = Joi.object({
  content: content.required(),
  multimediaID: multimediaID,
  date: date.required(),
  hour: hour.required(),
  userSenderID: userSenderID.required(),
  chatRoomID: chatRoomID.required()
});

const updateMessageSchema = Joi.object({
  content: content,
  multimediaID: multimediaID,
  date: date,
  hour: hour,
  userSenderID: userSenderID,
  chatRoomID: chatRoomID
});

const getValidMessage = Joi.object({
  id:id.required()
});

module.exports = { createMessageSchema, updateMessageSchema, getValidMessage };