const Joi = require('joi');

const id = Joi.string().uuid();
const publicationID = Joi.string().uuid();
const multimediaID = Joi.string().uuid();

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