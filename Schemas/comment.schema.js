const Joi = require('joi');

const id = Joi.string();
const publicationID = Joi.string();
const userID = Joi.string();
const content = Joi.string().min(1).max(250);
const multimedia = Joi.array().items(
  Joi.object().keys({
    name: Joi.string(),
    path: Joi.string(),
    extention: Joi.string().max(6)
  })
);

const createCommentchema = Joi.object({
  publicationID: publicationID.required(),
  userID: userID.required(),
  content: content.required(),
  multimedia: multimedia.required()
});

const updateCommentSchema = Joi.object({
  publicationID: publicationID,
  userID: userID,
  content: content,
  multimedia: multimedia
});

const getValidComment = Joi.object({
  id: id.required()
});

module.exports = {
  createCommentchema,
  updateCommentSchema,
  getValidComment
};