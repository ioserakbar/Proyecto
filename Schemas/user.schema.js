const Joi = require('joi');


const id = Joi.string().uuid();
const name = Joi.string().min(2).max(40);
const age = Joi.number().integer().min(13);
const gender = Joi.string().alphanum();
const voicechat = Joi.boolean();
const country = Joi.string.uuid();
const schedule = Joi.string().uuid();
const description = Joi.string().max(250);
const profile = Joi.string().max(100);
const profilePic = Joi.string();


const createUserSchema = Joi.object({
  name: name.required(),
  age: age.required(),
  gender: gender,
  voicechat: voicechat.required(),
  country: country.required(),
  schedule:schedule,
  description:description,
  profile: profile,  
  profilePic: profilePic
});

const updateUserSchema = Joi.object({
  name: name,
  age: age,
  gender: gender,
  voicechat: voicechat,
  country: country,
  schedule:schedule,
  description:description,
  profile: profile,
  profilePic: profilePic 
});

const getValidUser = Joi.object({
  id:id.required()
});

const getValidUserCountry = Joi.object({
  country:country.required()
});

module.exports = { createUserSchema, updateUserSchema, getValidUser, getValidUserCountry};