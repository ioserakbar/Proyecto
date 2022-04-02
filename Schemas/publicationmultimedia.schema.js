const Joi = require('joi');

const id = Joi.string();
const publicationID = Joi.string();
const multimediaID = Joi.string();

const createPublicationMultimediaSchema = Joi.object({
  publicationID: publicationID.required(),
  multimediaID: multimediaID.required()
});

const updatePublicationMultimediaSchema = Joi.object({
  publicationID: publicationID,
  multimediaID: multimediaID
});

const getValidPublicationMultimedia = Joi.object({
  id:id.required()
});

module.exports = { createPublicationMultimediaSchema, updatePublicationMultimediaSchema, getValidPublicationMultimedia };