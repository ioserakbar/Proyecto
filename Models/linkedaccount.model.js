
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const  linkedAccountSchema = new Schema ({
  id:String,
  userID:String,
  email:String,
  type: String,
})

const modelLinkedAccount = mongoose.model('linkedAccount', linkedAccountSchema);
module.exports = modelLinkedAccount;

/**const id = Joi.string().uuid();
const userID = Joi.string().uuid();
const email = Joi.string().email();
const type = Joi.string().alphanum().min(3).max(20);
 */
