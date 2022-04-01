const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const  commentMultimediaSchema = new Schema ({
  id:String,
  commentID:String,
  multimediaID:String
})

const modelCommentMultimedia = mongoose.model('commentMultimedia', commentMultimediaSchema);
module.exports = modelCommentMultimedia;

/*const id = Joi.string().uuid();
const commentID = Joi.string().uuid();
const multimediaID = Joi.string().uuid();*/