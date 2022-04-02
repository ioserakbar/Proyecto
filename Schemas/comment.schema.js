const Joi = require('joi');

const id = Joi.string();
const publicationID = Joi.string();
const userID = Joi.string();
const content = Joi.string().min(1).max(250);

const createCommentchema = Joi.object({
  publicationID: publicationID.required(),
  userID: userID.required(),
  content: content.required()
});

const updateCommentSchema = Joi.object({
  publicationID: publicationID,
  userID: userID,
  content: content
});

const getValidComment = Joi.object({
  id:id.required()
});

module.exports = { createCommentchema, updateCommentSchema, getValidComment };