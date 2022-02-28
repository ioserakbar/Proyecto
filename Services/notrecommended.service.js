const faker = require('faker');

const boom = require('@hapi/boom');

class NotRecommendedService{

  constructor(){
    this.notRecommendeds = [];
    this.generate();
  }

  //GENERATE RANDOM INFO 
  generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++)
      this.notRecommendeds.push({
        id: faker.datatype.uuid(),
        notRecomndedeUser: faker.datatype.uuid(),
        userID: faker.datatype.uuid()
      });   
  }

  //FIND ALL INFO
  find(size){
    const notRecommendeds = this.notRecommendeds.filter((item, index) => item && index < size);
    if(!notRecommendeds)
      throw boom.notFound("No se encontro el catalogo deseado");
    else if (notRecommendeds.length <= 0 )
      throw boom.notFound("Aún no hay cuentas creadas");
    return notRecommendeds;
  }

  //CREATE INFO
  create(data){
    const newnotRecommended = {
      id: faker.datatype.uuid(),
      ...data //PASA TODOS LOS ELEMENTOS Y LOS COMBINA
    }
    this.notRecommendeds.push(newnotRecommended);
    return newnotRecommended;
  }

  //FIND SPECIFIC ACCOUNT
  findOne(id){
    const notRecommended = this.notRecommendeds.find((item) => item.id === id)
    if(!notRecommended)
      throw boom.notFound('La cuenta no fue encontrada');
    return notRecommended;

  }

  //EDIT SPECIFIC ACCOUNT
  update(id, changes){
    const index = this.notRecommendeds.findIndex(item => item.id === id);
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");
    
    var currentnotRecommended = this.notRecommendeds[index];
    this.notRecommendeds[index] =  {
      ...currentnotRecommended, 
      ...changes
    };

    return {
      old : currentnotRecommended, 
      changed: this.notRecommendeds[index]
    };
  }

  delete(id){
    
    const index = this.notRecommendeds.findIndex(item => item.id === id)
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");

    const currentnotRecommended = this.notRecommendeds[index];

    this.notRecommendeds.splice(index, 1);
    return currentnotRecommended
  }
   
}

module.exports = NotRecommendedService;