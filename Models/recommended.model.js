const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recommendedSchema = new Schema({
  id: String,
  recommendedUser: String,
  userID: String
})

const modelRecommended = mongoose.model('recommended', recommendedSchema);
module.exports = modelRecommended;


/**const id = Joi.string().uuid();
const recommendedUser = Joi.string().uuid();
const userID = Joi.string().uuid();
 */