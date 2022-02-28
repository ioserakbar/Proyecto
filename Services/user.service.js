const faker = require('faker');

const boom = require('@hapi/boom');

class UserService{

  constructor(){
    this.users = [];
    this.generate();
  }

  //GENERATE RANDOM INFO 
  generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++)
      this.accounts.push({
        id: faker.datatype.uuid(),
        commentID: faker.datatype.uuid(),
        multimediaID: faker.datatype.uuid()
      });   
  }

  //FIND ALL INFO
  find(size){
    const users = this.users.filter((item, index) => item && index < size);
    if(!users)
      throw boom.notFound("No se encontro el catalogo deseado");
    else if (users.length <= 0 )
      throw boom.notFound("Aún no hay cuentas creadas");
    return users;
  }

  //CREATE INFO
  create(data){
    const newuser = {
      id: faker.datatype.uuid(),
      ...data //PASA TODOS LOS ELEMENTOS Y LOS COMBINA
    }
    this.users.push(newuser);
    return newuser;
  }

  //FIND SPECIFIC ACCOUNT
  findOne(id){
    const user = this.users.find((item) => item.id === id)
    if(!user)
      throw boom.notFound('La cuenta no fue encontrada');
    return user;

  }

  //EDIT SPECIFIC ACCOUNT
  update(id, changes){
    const index = this.users.findIndex(item => item.id === id);
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");
    
    var currentuser = this.users[index];
    this.users[index] =  {
      ...currentuser, 
      ...changes
    };

    return {
      old : currentuser, 
      changed: this.users[index]
    };
  }

  delete(id){
    
    const index = this.users.findIndex(item => item.id === id)
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");

    const currentuser = this.users[index];

    this.users.splice(index, 1);
    return currentuser
  }
   
}

module.exports = UserService;