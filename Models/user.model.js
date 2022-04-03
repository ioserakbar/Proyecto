const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: mongoose.Types.ObjectId,
  name: String,
  age: Number,
  gender: String,
  voicechat: Boolean,
  countryID: String,
  schedule: Object,
  description: String,
  profile: String,
  profilePic: String,
  user: String,
  password: String,
  email: String,
  linkedAccounts: Array,
  friends: Array,
  favoriteGames: Array
})

const modelUser = mongoose.model('user', userSchema);
module.exports = modelUser;


/**
const id = Joi.string().uuid();
const name = Joi.string().min(2).max(40);
const age = Joi.number().integer().min(13);
const gender = Joi.string().alphanum();
const voicechat = Joi.boolean();
const country = Joi.string().uuid();
const schedule = Joi.string().uuid();
const description = Joi.string().max(250);
const profile = Joi.string().max(100);
const profilePic = Joi.string();
 */