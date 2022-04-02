//const faker = require('faker');
const boom = require('@hapi/boom');
const AccountModel = require('../Models/account.model');

const errNotFound = "No se logró encontrar lo buscado";
const errEmpty = "Aún no hay cuentas creadas";


class AccountService{

  

  //FIND ALL INFO
  async find(limit, filter){
    
    let accounts = await AccountModel.find(filter);
    
    if(accounts == undefined || accounts == null)
      throw boom.notFound(errNotFound);
    if(accounts.length <= 0 )
      throw boom.notFound(errEmpty);

    accounts = accounts.filter((item, index) => item && index < limit);
    
    return accounts;

  }

  //CREATE INFO
  async create(data){

    const newAccount = new AccountModel(data);
    await newAccount.save(); 
    return data;
  }

  //FIND SPECIFIC ACCOUNT
  async findOne(id){
    const account = await AccountModel.findOne({
      _id:id
    })

    if(account == undefined || account == null)
      throw boom.notFound(errNotFound);
    if(account.length <= 0 )
      throw boom.notFound(errEmpty);

    return account;

  }

  //EDIT SPECIFIC ACCOUNT
  async update(id, changes){
    
    let account = await AccountModel.findOne({
      _id:id
    });

    if(account == undefined || account == null)
      throw boom.notFound(errNotFound);
    if(account.length <= 0 )
      throw boom.notFound(errEmpty);

    let originalAccount = {
      user:account.user,
      password:account.password,
      email:account.email,
      userID:account.userID
    };

    const {user, password, email, userID} = changes;

    if(user)
      account.user = user
    if(password)
      account.password = password
    if(email)
      account.email = email
    if(userID)
      account.userID = userID

    await account.save();
    return {
      old : originalAccount, 
      changed: account
    };
  }

  async delete(id){
    let account = await AccountModel.findOne({
      _id:id
    });

    const { deletedCount } = await AccountModel.deleteOne({
      _id:id
    });

    if(deletedCount <= 0 )
      throw boom.notFound(errEmpty);
    
    return account;
  }
   
}

module.exports = AccountService;