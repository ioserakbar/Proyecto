const faker = require('faker');

const boom = require('@hapi/boom');

class LinkedAccountService{

  constructor(){
    this.linkedAccounts = [];
    this.generate();
  }

  //GENERATE RANDOM INFO 
  generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++)
      this.linkedAccounts.push({
        id: faker.datatype.uuid(),
        userID: faker.datatype.uuid(),
        email: faker.internet.email(),
        type: faker.lorem.sentence()
      });   
  }

  //FIND ALL INFO
  find(size){
    const linkedAccounts = this.linkedAccounts.filter((item, index) => item && index < size);
    if(!linkedAccounts)
      throw boom.notFound("No se encontro el catalogo deseado");
    else if (linkedAccounts.length <= 0 )
      throw boom.notFound("Aún no hay cuentas creadas");
    return linkedAccounts;
  }

  //CREATE INFO
  create(data){
    const newlinkedAccount = {
      id: faker.datatype.uuid(),
      ...data //PASA TODOS LOS ELEMENTOS Y LOS COMBINA
    }
    this.linkedAccounts.push(newlinkedAccount);
    return newlinkedAccount;
  }

  //FIND SPECIFIC ACCOUNT
  findOne(id){
    const linkedAccount = this.linkedAccounts.find((item) => item.id === id)
    if(!linkedAccount)
      throw boom.notFound('La cuenta no fue encontrada');
    return linkedAccount;

  }

  //EDIT SPECIFIC ACCOUNT
  update(id, changes){
    const index = this.linkedAccounts.findIndex(item => item.id === id);
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");
    
    var currentlinkedAccount = this.linkedAccounts[index];
    this.linkedAccounts[index] =  {
      ...currentlinkedAccount, 
      ...changes
    };

    return {
      old : currentlinkedAccount, 
      changed: this.linkedAccounts[index]
    };
  }

  delete(id){
    
    const index = this.linkedAccounts.findIndex(item => item.id === id)
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");

    const currentlinkedAccount = this.linkedAccounts[index];

    this.linkedAccounts.splice(index, 1);
    return currentlinkedAccount
  }
   
}

module.exports = LinkedAccountService;