//const faker = require('faker');
const boom = require('@hapi/boom');
const UserModel = require('../Models/user.model');

const errNotFound = "No se logró encontrar lo buscado";
const errEmpty = "Aún no hay cuentas creadas";


class UserService{

  

  //FIND ALL INFO
  async find(limit, filter){
    
    let users = await UserModel.find(filter);
    
    if(users == undefined || users == null)
      throw boom.notFound(errNotFound);
    if(users.length <= 0 )
      throw boom.notFound(errEmpty);

    users = users.filter((item, index) => item && index < limit);
    
    return users;

  }

  //CREATE INFO
  async create(data){

    const newUser = new UserModel(data);
    await newUser.save(); 
    return data;
  }

  //FIND SPECIFIC ACCOUNT
  async findOne(id){
    const user = await UserModel.findOne({
      _id:id
    })

    if(user == undefined || user == null)
      throw boom.notFound(errNotFound);
    if(user.length <= 0 )
      throw boom.notFound(errEmpty);

    return user;

  }

  //EDIT SPECIFIC ACCOUNT
  async update(id, changes){
    
    let user = await UserModel.findOne({
      _id:id
    });

    if(user == undefined || user == null)
      throw boom.notFound(errNotFound);
    if(user.length <= 0 )
      throw boom.notFound(errEmpty);

    let originalUser = {
      name:user.name,
      age:user.age,
      gender:user.gender,
      voicechat:user.voicechat,
      countryID: user.countryID,
      scheduleID: user.scheduleID,
      description:user.description,
      profile: user.profile,
      profilePic:user.profilePic
    };

    const {name, age, gender, voicechat, countryID, scheduleID, description, profile, profilePic} = changes;

    if(name)
      user.name = name;
    if(age)
      user.age = age;
    if(gender)
      user.gender = gender;
    if(voicechat)
      user.voicechat = voicechat;
    if(countryID)
      user.countryID = countryID;
    if(scheduleID)
      user.scheduleID = scheduleID;
    if(description)
      user.description = description;
    if(profile)
      user.profile = profile;
    if(profilePic)
      user.profilePic = profilePic;
    
    await user.save();
    
    return {
      old : originalUser, 
      changed: user
    };
  }

  async delete(id){
    let user = await UserModel.findOne({
      _id:id
    });

    const { deletedCount } = await UserModel.deleteOne({
      _id:id
    });

    if(deletedCount <= 0 )
      throw boom.notFound(errEmpty);
    
    return user;
  }
   
}

module.exports = UserService;