const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const  messageSchema = new Schema ({
  id:String,
  content:String,
  multimediaID:String,
  date: Date,
  hour:String,
  userSenderID: String,
  chatRoomID: String
})

const modelMessage = mongoose.model('message', messageSchema);
module.exports = modelMessage;

/**const id = Joi.string().uuid();
const content = Joi.string().min(1).max(250);
const multimediaID = Joi.string().uuid();
const date = Joi.date();
const hour = Joi.string().pattern(/^([0-9]{2}):([0-9]{2})$/);
const userSenderID = Joi.string().uuid();
const chatRoomID = Joi.string().uuid(); */