const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  id: String,
  publicationID: String,
  userID: String,
  content: String,
  multimedia: Object
})

const modelComment = mongoose.model('comment', commentSchema);
module.exports = modelComment;

/**const id = Joi.string().uuid();
const publicationID = Joi.string().uuid();
const userID = Joi.string().uuid();
const content = Joi.string().min(1).max(250); */