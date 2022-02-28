const faker = require('faker');

const boom = require('@hapi/boom');

class PublicationMultimediaService{

  constructor(){
    this.publicationMultimedias = [];
    this.generate();
  }

  //GENERATE RANDOM INFO 
  generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++)
      this.publicationMultimedias.push({
        id: faker.datatype.uuid(),
        publicationID: faker.datatype.uuid(),
        multimediaID: faker.datatype.uuid()
      });   
  }

  //FIND ALL INFO
  find(size){
    const publicationMultimedias = this.publicationMultimedias.filter((item, index) => item && index < size);
    if(!publicationMultimedias)
      throw boom.notFound("No se encontro el catalogo deseado");
    else if (publicationMultimedias.length <= 0 )
      throw boom.notFound("Aún no hay cuentas creadas");
    return publicationMultimedias;
  }

  //CREATE INFO
  create(data){
    const newpublicationMultimedia = {
      id: faker.datatype.uuid(),
      ...data //PASA TODOS LOS ELEMENTOS Y LOS COMBINA
    }
    this.publicationMultimedias.push(newpublicationMultimedia);
    return newpublicationMultimedia;
  }

  //FIND SPECIFIC ACCOUNT
  findOne(id){
    const publicationMultimedia = this.publicationMultimedias.find((item) => item.id === id)
    if(!publicationMultimedia)
      throw boom.notFound('La cuenta no fue encontrada');
    return publicationMultimedia;

  }

  //EDIT SPECIFIC ACCOUNT
  update(id, changes){
    const index = this.publicationMultimedias.findIndex(item => item.id === id);
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");
    
    var currentpublicationMultimedia = this.publicationMultimedias[index];
    this.publicationMultimedias[index] =  {
      ...currentpublicationMultimedia, 
      ...changes
    };

    return {
      old : currentpublicationMultimedia, 
      changed: this.publicationMultimedias[index]
    };
  }

  delete(id){
    
    const index = this.publicationMultimedias.findIndex(item => item.id === id)
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");

    const currentpublicationMultimedia = this.publicationMultimedias[index];

    this.publicationMultimedias.splice(index, 1);
    return currentpublicationMultimedia
  }
   
}

module.exports = PublicationMultimediaService;