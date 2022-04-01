const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const  videoPlaySchema = new Schema ({
  id:String,
  date:Date,
  gameID:String,
  userID:String,
  content:String,
  multimediaID:String
})

const modelVideoPlay = mongoose.model('videoPlay', videoPlaySchema);
module.exports = modelVideoPlay;

/**const id = Joi.string().uuid();
const date = Joi.date();
const gameID = Joi.string().uuid();
const userID = Joi.string().uuid();
const content = Joi.string().max(250);
const multimediaID = Joi.string().uuid(); */