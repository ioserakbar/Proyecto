const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//mongoose.set('debug', true);

const accountSchema = new Schema ({
  id:String,
  user:String,
  password:String,
  email:String,
  userID:String
})

const modelAccount = mongoose.model('account', accountSchema);
module.exports = modelAccount;

/*id = Joi.string().uuid();
const user = Joi.string().min(2).max(25);
const password = Joi.string().min(8).max(15);
const email = Joi.string().email();
const userID = Joi.string().uuid();*/