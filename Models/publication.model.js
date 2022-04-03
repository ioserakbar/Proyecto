const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const publicationSchema = new Schema({
  id: String,
  date: Date,
  content: String,
  userID: String,
  multimedia: Array
})

const modelPublication = mongoose.model('publication', publicationSchema);
module.exports = modelPublication;

/**const id = Joi.string().uuid();
const date = Joi.date();
const content = Joi.string().min(1).max(1000);
const userId = Joi.string().uuid(); */