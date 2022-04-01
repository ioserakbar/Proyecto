const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const  notRecommendedSchema = new Schema ({
  id:String,
  notRecommendedUser:String,
  userID:String
})

const modelNotRecommended = mongoose.model('notRecommended', notRecommendedSchema);
module.exports = modelNotRecommended;

/**const id = Joi.string().uuid();
const notRecommendeUser = Joi.string().uuid();
const userID = Joi.string().uuid(); */