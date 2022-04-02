const Joi = require('joi');

const id = Joi.string();
const commentID = Joi.string();
const multimediaID = Joi.string();

const createCommentMultimediaSchema = Joi.object({
  commentID: commentID.required(),
  multimediaID: multimediaID.required()
});

const updateCommentMultimediaSchema = Joi.object({
  commentID: commentID,
  multimediaID: multimediaID
});

const getValidCommentMultimedia = Joi.object({
  id:id.required()
});

module.exports = { createCommentMultimediaSchema, updateCommentMultimediaSchema, getValidCommentMultimedia };