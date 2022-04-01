const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatroomSchema = new Schema ({
  id:String,
  userOne:String,
  userTwo:String
})

const modelChatroom = mongoose.model('chatRoom', chatroomSchema);
module.exports = modelChatroom;


/**const id = Joi.string().uuid();
const userOne = Joi.string().uuid();
const userTwo = Joi.string().uuid(); */