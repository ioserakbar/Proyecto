const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const  publicationMultimediaSchema = new Schema ({
  id:String,
  publicationID:String,
  multimediaID:String
})

const modelPublicationMultimedia = mongoose.model('publicationMultimedia', publicationMultimediaSchema);
module.exports = modelPublicationMultimedia;

/**const id = Joi.string().uuid();
const publicationID = Joi.string().uuid();
const multimediaID = Joi.string().uuid(); */