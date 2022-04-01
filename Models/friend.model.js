const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const  friendSchema = new Schema ({
  id:String,
  userOne:String,
  userTwo:String,
  date: Date
})

const modelFriend = mongoose.model('friend', friendSchema);
module.exports = modelFriend;

/**const id = Joi.string().uuid();
const userOne = Joi.string().uuid();
const userTwo = Joi.string().uuid();
const date = Joi.date(); */