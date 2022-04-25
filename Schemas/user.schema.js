const Joi = require('joi');


const id = Joi.string();
const name = Joi.string().min(2).max(40);
const age = Joi.number().integer().min(13);
const gender = Joi.string().alphanum();
const voicechat = Joi.boolean();
const country = Joi.string();
const schedule = Joi.object().keys({
  lunes: Joi.string().pattern(/^([0-9]{2}[:][0-9]{2}[ ]{1}[-]{1}[ ]{1}[0-9]{2}[:][0-9]{2})$/).min(13).max(13),
  martes: Joi.string().pattern(/^([0-9]{2}[:][0-9]{2}[ ]{1}[-]{1}[ ]{1}[0-9]{2}[:][0-9]{2})$/).min(13).max(13),
  miercoles: Joi.string().pattern(/^([0-9]{2}[:][0-9]{2}[ ]{1}[-]{1}[ ]{1}[0-9]{2}[:][0-9]{2})$/).min(13).max(13),
  jueves: Joi.string().pattern(/^([0-9]{2}[:][0-9]{2}[ ]{1}[-]{1}[ ]{1}[0-9]{2}[:][0-9]{2})$/).min(13).max(13),
  viernes: Joi.string().pattern(/^([0-9]{2}[:][0-9]{2}[ ]{1}[-]{1}[ ]{1}[0-9]{2}[:][0-9]{2})$/).min(13).max(13),
  sabado: Joi.string().pattern(/^([0-9]{2}[:][0-9]{2}[ ]{1}[-]{1}[ ]{1}[0-9]{2}[:][0-9]{2})$/).min(13).max(13),
  domingo: Joi.string().pattern(/^([0-9]{2}[:][0-9]{2}[ ]{1}[-]{1}[ ]{1}[0-9]{2}[:][0-9]{2})$/).min(13).max(13)
});
const description = Joi.string().max(250);
const profile = Joi.string().max(100);
const profilePic = Joi.object().keys({
  name: Joi.string(),
  path: Joi.string(),
  extention: Joi.string().max(6)
});
const user = Joi.string().min(2).max(25);
const password = Joi.string().min(8).max(15);
const email = Joi.string().email();
const linkedAccounts = Joi.array().items(
  Joi.object().keys({
    tipo: Joi.string(),
    username: Joi.string(),
    friendCode: Joi.string(),
    email: Joi.string()
  })
);
const friends = Joi.array().items(
  Joi.object().keys({
    user: Joi.string(),
    date: Joi.date()
  })
);
const favoriteGames = Joi.array().items(
  Joi.object().keys({
    ranked: Joi.string(),
    timePlayed: Joi.string(),
    gameID: Joi.string()
  })
);

const createUserSchema = Joi.object({
  name: name.required(),
  age: age.required(),
  gender: gender,
  voicechat: voicechat.required(),
  countryID: country.required(),
  schedule: schedule,
  description: description,
  profile: profile,
  profilePic: profilePic,
  user: user.required(),
  password: password.required(),
  email: email.required(),
  linkedAccounts: linkedAccounts,
  friends: friends,
  favoriteGames: favoriteGames
});

const updateUserSchema = Joi.object({
  name: name,
  age: age,
  gender: gender,
  voicechat: voicechat,
  country: country,
  schedule: schedule,
  description: description,
  profile: profile,
  profilePic: profilePic,
  user: user,
  password: password,
  email: email,
  linkedAccounts: linkedAccounts,
  friends: friends,
  favoriteGames: favoriteGames
});

const getValidUser = Joi.object({
  id: id.required()
});

const getValidUserCountry = Joi.object({
  country: country.required()
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getValidUser,
  getValidUserCountry
};