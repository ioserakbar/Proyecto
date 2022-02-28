const faker = require('faker');

const boom = require('@hapi/boom');

class FriendService{

  constructor(){
    this.Friends = [];
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
    const Friends = this.Friends.filter((item, index) => item && index < size);
    if(!Friends)
      throw boom.notFound("No se encontro el catalogo deseado");
    else if (Friends.length <= 0 )
      throw boom.notFound("Aún no hay cuentas creadas");
    return Friends;
  }

  //CREATE INFO
  create(data){
    const newFriend = {
      id: faker.datatype.uuid(),
      ...data //PASA TODOS LOS ELEMENTOS Y LOS COMBINA
    }
    this.Friends.push(newFriend);
    return newFriend;
  }

  //FIND SPECIFIC ACCOUNT
  findOne(id){
    const friend = this.Friends.find((item) => item.id === id)
    if(!friend)
      throw boom.notFound('La cuenta no fue encontrada');
    return friend;

  }

  //EDIT SPECIFIC ACCOUNT
  update(id, changes){
    const index = this.Friends.findIndex(item => item.id === id);
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");
    
    var currentFriend = this.Friends[index];
    this.Friends[index] =  {
      ...currentFriend, 
      ...changes
    };

    return {
      old : currentFriend, 
      changed: this.Friends[index]
    };
  }

  delete(id){
    
    const index = this.Friends.findIndex(item => item.id === id)
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");

    const currentFriend = this.Friends[index];

    this.Friends.splice(index, 1);
    return currentFriend
  }
   
}

module.exports = FriendService;