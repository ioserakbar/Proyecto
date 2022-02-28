const Joi = require('joi');

const id = Joi.string().uuid();
const commentID = Joi.string().uuid();
const multimediaID = Joi.string().uuid();

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