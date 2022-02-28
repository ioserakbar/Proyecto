const faker = require('faker');

const boom = require('@hapi/boom');

class MultimediaService{
  constructor(){
    this.multimedias = [];
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
    const multimedias = this.multimedias.filter((item, index) => item && index < size);
    if(!multimedias)
      throw boom.notFound("No se encontro el catalogo deseado");
    else if (multimedias.length <= 0 )
      throw boom.notFound("Aún no hay cuentas creadas");
    return multimedias;
  }

  //CREATE INFO
  create(data){
    const newmultimedia = {
      id: faker.datatype.uuid(),
      ...data //PASA TODOS LOS ELEMENTOS Y LOS COMBINA
    }
    this.multimedias.push(newmultimedia);
    return newmultimedia;
  }

  //FIND SPECIFIC ACCOUNT
  findOne(id){
    const multimedia = this.multimedias.find((item) => item.id === id)
    if(!multimedia)
      throw boom.notFound('La cuenta no fue encontrada');
    return multimedia;

  }

  //EDIT SPECIFIC ACCOUNT
  update(id, changes){
    const index = this.multimedias.findIndex(item => item.id === id);
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");
    
    var currentmultimedia = this.multimedias[index];
    this.multimedias[index] =  {
      ...currentmultimedia, 
      ...changes
    };

    return {
      old : currentmultimedia, 
      changed: this.multimedias[index]
    };
  }

  delete(id){
    
    const index = this.multimedias.findIndex(item => item.id === id)
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");

    const currentmultimedia = this.multimedias[index];

    this.multimedias.splice(index, 1);
    return currentmultimedia
  }
   
}

module.exports = MultimediaService;