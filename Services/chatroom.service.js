const faker = require('faker');

const boom = require('@hapi/boom');

class ChatroomService{

  constructor(){
    this.chatrooms = [];
    this.generate();
  }

  //GENERATE RANDOM INFO 
  generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++)
      this.accounts.push({
        id: faker.datatype.uuid(),
        userOne: faker.datatype.uuid(),
        userTwo: faker.datatype.uuid()
      });   
  }

  //FIND ALL INFO
  find(size){
    const chatrooms = this.chatrooms.filter((item, index) => item && index < size);
    if(!chatrooms)
      throw boom.notFound("No se encontro el catalogo deseado");
    else if (chatrooms.length <= 0 )
      throw boom.notFound("Aún no hay cuentas creadas");
    return chatrooms;
  }

  //CREATE INFO
  create(data){
    const newChatroom = {
      id: faker.datatype.uuid(),
      ...data //PASA TODOS LOS ELEMENTOS Y LOS COMBINA
    }
    this.chatrooms.push(newChatroom);
    return newChatroom;
  }

  //FIND SPECIFIC ACCOUNT
  findOne(id){
    const chatroom = this.chatrooms.find((item) => item.id === id)
    if(!chatroom)
      throw boom.notFound('La cuenta no fue encontrada');
    return chatroom;

  }

  //EDIT SPECIFIC ACCOUNT
  update(id, changes){
    const index = this.chatrooms.findIndex(item => item.id === id);
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");
    
    var currentChatroom = this.chatrooms[index];
    this.chatrooms[index] =  {
      ...currentChatroom, 
      ...changes
    };

    return {
      old : currentChatroom, 
      changed: this.chatrooms[index]
    };
  }

  delete(id){
    
    const index = this.chatrooms.findIndex(item => item.id === id)
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");

    const currentChatroom = this.chatrooms[index];

    this.chatrooms.splice(index, 1);
    return currentChatroom
  }
   
}

module.exports = ChatroomService;