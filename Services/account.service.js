const faker = require('faker');
const boom = require('@hapi/boom');
const AccountModel = require('../Models/account.model');

const errNotFound = "No se encontro el catalogo deseado";
const errEmpty = "Aún no hay cuentas creadas";


class AccountService{

  constructor(){
    this.accounts = [];
    this.generate();
  }

  //GENERATE RANDOM INFO 
  generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++)
      this.accounts.push({
        id: faker.datatype.uuid(),
        user: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        userID: faker.datatype.uuid()
      });   
  }

  //FIND ALL INFO
  async find(limit, filter){
    
    let accounts = await AccountModel.find(filter);
    
    if(!accounts)
      throw boom.notFound(errNotFound);
    else if (accounts.length <= 0 )
      throw boom.notFound(errEmpty);

    accounts = accounts.filter((item, index) => item && index < limit);
    
    return accounts;

  }

  //CREATE INFO
  async create(data){
    const info = {
      id: faker.datatype.uuid(),
      ...data //PASA TODOS LOS ELEMENTOS Y LOS COMBINA
    }
    const newAccount = new AccountModel(info);
    await newAccount.save(); 

    return info;
  }

  //FIND SPECIFIC ACCOUNT
  findOne(id){
    const account = this.accounts.find((item) => item.id === id)
    if(!account)
      throw boom.notFound('La cuenta no fue encontrada');
    return account;

  }

  //EDIT SPECIFIC ACCOUNT
  update(id, changes){
    const index = this.accounts.findIndex(item => item.id === id);
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");
    
    var currentAccount = this.accounts[index];
    this.accounts[index] =  {
      ...currentAccount, 
      ...changes
    };

    return {
      old : currentAccount, 
      changed: this.accounts[index]
    };
  }

  delete(id){
    const index = this.accounts.findIndex(item => item.id === id)
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");

    const currentAccount = this.accounts[index];

    this.accounts.splice(index, 1);
    return currentAccount
  }
   
}

module.exports = AccountService;