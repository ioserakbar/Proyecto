const faker = require('faker');

const boom = require('@hapi/boom');

class CommentMultimediService{

  constructor(){
    this.commentMultimedias = [];
    this.generate();
  }

  //GENERATE RANDOM INFO 
  generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++)
      this.commentMultimedias.push({
        id: faker.datatype.uuid(),
        commentID: faker.datatype.uuid(),
        multimediaID: faker.datatype.uuid()
      });   
  }

  //FIND ALL INFO
  find(size){
    const commentMultimedias = this.commentMultimedias.filter((item, index) => item && index < size);
    if(!commentMultimedias)
      throw boom.notFound("No se encontro el catalogo deseado");
    else if (commentMultimedias.length <= 0 )
      throw boom.notFound("Aún no hay cuentas creadas");
    return commentMultimedias;
  }

  //CREATE INFO
  create(data){
    const newCommentMultimedia = {
      id: faker.datatype.uuid(),
      ...data //PASA TODOS LOS ELEMENTOS Y LOS COMBINA
    }
    this.commentMultimedias.push(newCommentMultimedia);
    return newCommentMultimedia;
  }

  //FIND SPECIFIC ACCOUNT
  findOne(id){
    const commentMultimedia = this.commentMultimedias.find((item) => item.id === id)
    if(!commentMultimedia)
      throw boom.notFound('La cuenta no fue encontrada');
    return commentMultimedia;

  }

  //EDIT SPECIFIC ACCOUNT
  update(id, changes){
    const index = this.commentMultimedias.findIndex(item => item.id === id);
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");
    
    var currentcommentMultimedia = this.commentMultimedias[index];
    this.commentMultimedias[index] =  {
      ...currentcommentMultimedia, 
      ...changes
    };

    return {
      old : currentcommentMultimedia, 
      changed: this.commentMultimedias[index]
    };
  }

  delete(id){
    
    const index = this.commentMultimedias.findIndex(item => item.id === id)
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");

    const currentcommentMultimedia = this.commentMultimedias[index];

    this.commentMultimedias.splice(index, 1);
    return currentcommentMultimedia
  }
   
}

module.exports = CommentMultimediService;