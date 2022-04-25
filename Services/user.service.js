//const faker = require('faker');
const boom = require('@hapi/boom');
const UserModel = require('../Models/user.model');



const errNotFound = "No se logró encontrar lo buscado";
const errEmpty = "Aún no hay cuentas creadas";

class UserService {



  //FIND ALL INFO
  async find(limit, filter) {

    let users = await UserModel.find(filter);

    if (users == undefined || users == null)
      throw boom.notFound(errNotFound);
    if (users.length <= 0)
      throw boom.notFound(errEmpty);

    users = users.filter((item, index) => item && index < limit);

    return users;

  }

  //CREATE INFO
  async create(data) {

    const newUser = new UserModel(data);
    await newUser.save();
    return newUser;
  }

  //FIND SPECIFIC ACCOUNT
  async findOne(id) {
    const user = await UserModel.findOne({
      _id: id
    })

    if (user == undefined || user == null)
      throw boom.notFound(errNotFound);
    if (user.length <= 0)
      throw boom.notFound(errEmpty);

    return user;

  }

  //EDIT SPECIFIC ACCOUNT
  async update(id, changes) {

    let userToChange = await UserModel.findOne({
      _id: id
    });

    if (userToChange == undefined || userToChange == null)
      throw boom.notFound(errNotFound);
    if (userToChange.length <= 0)
      throw boom.notFound(errEmpty);

    let originalUser = {
      name: userToChange.name,
      age: userToChange.age,
      gender: userToChange.gender,
      voicechat: userToChange.voicechat,
      countryID: userToChange.countryID,
      schedule: userToChange.schedule,
      description: userToChange.description,
      profile: userToChange.profile,
      profilePic: userToChange.profilePic,
      user: userToChange.user,
      password: userToChange.password,
      email: userToChange.email,
      linkedAccounts: userToChange.linkedAccounts,
      friends: userToChange.friends,
      favoriteGames: userToChange.favoriteGames,
      backgroundImg : userToChange.backgroundImg
    };

    const {
      name,
      age,
      gender,
      voicechat,
      countryID,
      schedule,
      description,
      profile,
      profilePic,
      user,
      password,
      email,
      linkedAccounts,
      friends,
      favoriteGames,
      backgroundImg
    } = changes;

    if (name)
      userToChange.name = name;
    if (age)
      userToChange.age = age;
    if (gender)
      userToChange.gender = gender;
    if (voicechat)
      userToChange.voicechat = voicechat;
    if (countryID)
      userToChange.countryID = countryID;
    if (schedule)
      userToChange.schedule = schedule;
    if (description)
      userToChange.description = description;
    if (profile)
      userToChange.profile = profile;
    if (profilePic)
      userToChange.profilePic = profilePic;
    if (user)
      userToChange.user = user
    if (password)
      userToChange.password = password
    if (email)
      userToChange.email = email
    if (linkedAccounts)
      userToChange.linkedAccounts = linkedAccounts
    if (friends)
      userToChange.friends = friends
    if (favoriteGames)
      userToChange.favoriteGames = favoriteGames
    if (backgroundImg)
      userToChange.backgroundImg = backgroundImg

    await userToChange.save();

    return {
      old: originalUser,
      changed: userToChange
    };
  }

  async delete(id) {
    let user = await UserModel.findOne({
      _id: id
    });

    const {
      deletedCount
    } = await UserModel.deleteOne({
      _id: id
    });

    if (deletedCount <= 0)
      throw boom.notFound(errEmpty);

    return user;
  }

}

module.exports = UserService;