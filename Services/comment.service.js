const faker = require('faker');

const boom = require('@hapi/boom');

class CommentService{

  constructor(){
    this.comments = [];
    this.generate();
  }

  //GENERATE RANDOM INFO 
  generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++)
      this.comments.push({
        id: faker.datatype.uuid(),
        publicationID: faker.datatype.uuid(),
        userID: faker.datatype.uuid(),
        content: faker.lorem.sentence()
      });   
  }

  //FIND ALL INFO
  find(size){
    const comments = this.comments.filter((item, index) => item && index < size);
    if(!comments)
      throw boom.notFound("No se encontro el catalogo deseado");
    else if (comments.length <= 0 )
      throw boom.notFound("Aún no hay cuentas creadas");
    return comments;
  }

  //CREATE INFO
  create(data){
    const newComment = {
      id: faker.datatype.uuid(),
      ...data //PASA TODOS LOS ELEMENTOS Y LOS COMBINA
    }
    this.comments.push(newComment);
    return newComment;
  }

  //FIND SPECIFIC ACCOUNT
  findOne(id){
    const comment = this.comments.find((item) => item.id === id)
    if(!comment)
      throw boom.notFound('La cuenta no fue encontrada');
    return comment;

  }

  //EDIT SPECIFIC ACCOUNT
  update(id, changes){
    const index = this.comments.findIndex(item => item.id === id);
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");
    
    var currentcomment = this.comments[index];
    this.comments[index] =  {
      ...currentcomment, 
      ...changes
    };

    return {
      old : currentcomment, 
      changed: this.comments[index]
    };
  }

  delete(id){
    
    const index = this.comments.findIndex(item => item.id === id)
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");

    const currentcomment = this.comments[index];

    this.comments.splice(index, 1);
    return currentcomment
  }
   
}

module.exports = CommentService;