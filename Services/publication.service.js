const faker = require('faker');

const boom = require('@hapi/boom');

class PublicationService{

  constructor(){
    this.publications = [];
    this.generate();
  }

  //GENERATE RANDOM INFO 
  generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++)
      this.publications.push({
        id: faker.datatype.uuid(),
        date: faker.datatype.uuid(),
        content: faker.lorem.sentence(),
        userID: faker.datatype.uuid()
      });   
  }

  //FIND ALL INFO
  find(size){
    const publications = this.publications.filter((item, index) => item && index < size);
    if(!publications)
      throw boom.notFound("No se encontro el catalogo deseado");
    else if (publications.length <= 0 )
      throw boom.notFound("Aún no hay cuentas creadas");
    return publications;
  }

  //CREATE INFO
  create(data){
    const newpublication = {
      id: faker.datatype.uuid(),
      ...data //PASA TODOS LOS ELEMENTOS Y LOS COMBINA
    }
    this.publications.push(newpublication);
    return newpublication;
  }

  //FIND SPECIFIC ACCOUNT
  findOne(id){
    const publication = this.publications.find((item) => item.id === id)
    if(!publication)
      throw boom.notFound('La cuenta no fue encontrada');
    return publication;

  }

  //EDIT SPECIFIC ACCOUNT
  update(id, changes){
    const index = this.publications.findIndex(item => item.id === id);
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");
    
    var currentpublication = this.publications[index];
    this.publications[index] =  {
      ...currentpublication, 
      ...changes
    };

    return {
      old : currentpublication, 
      changed: this.publications[index]
    };
  }

  delete(id){
    
    const index = this.publications.findIndex(item => item.id === id)
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");

    const currentpublication = this.publications[index];

    this.publications.splice(index, 1);
    return currentpublication
  }
   
}

module.exports = PublicationService;