const faker = require('faker');

const boom = require('@hapi/boom');

class MessageService{

  constructor(){
    this.messages = [];
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
    const messages = this.messages.filter((item, index) => item && index < size);
    if(!messages)
      throw boom.notFound("No se encontro el catalogo deseado");
    else if (messages.length <= 0 )
      throw boom.notFound("Aún no hay cuentas creadas");
    return messages;
  }

  //CREATE INFO
  create(data){
    const newmessage = {
      id: faker.datatype.uuid(),
      ...data //PASA TODOS LOS ELEMENTOS Y LOS COMBINA
    }
    this.messages.push(newmessage);
    return newmessage;
  }

  //FIND SPECIFIC ACCOUNT
  findOne(id){
    const message = this.messages.find((item) => item.id === id)
    if(!message)
      throw boom.notFound('La cuenta no fue encontrada');
    return message;

  }

  //EDIT SPECIFIC ACCOUNT
  update(id, changes){
    const index = this.messages.findIndex(item => item.id === id);
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");
    
    var currentmessage = this.messages[index];
    this.messages[index] =  {
      ...currentmessage, 
      ...changes
    };

    return {
      old : currentmessage, 
      changed: this.messages[index]
    };
  }

  delete(id){
    
    const index = this.messages.findIndex(item => item.id === id)
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");

    const currentmessage = this.messages[index];

    this.messages.splice(index, 1);
    return currentmessage
  }
   
}

module.exports = MessageService;