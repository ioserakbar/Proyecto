const faker = require('faker');

const boom = require('@hapi/boom');

class RecommendedService{

  constructor(){
    this.recommendeds = [];
    this.generate();
  }

  //GENERATE RANDOM INFO 
  generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++)
      this.recommendeds.push({
        id: faker.datatype.uuid(),
        recommendedUser: faker.datatype.uuid(),
        userID: faker.datatype.uuid()
      });   
  }

  //FIND ALL INFO
  find(size){
    const recommendeds = this.recommendeds.filter((item, index) => item && index < size);
    if(!recommendeds)
      throw boom.notFound("No se encontro el catalogo deseado");
    else if (recommendeds.length <= 0 )
      throw boom.notFound("Aún no hay cuentas creadas");
    return recommendeds;
  }

  //CREATE INFO
  create(data){
    const newrecommended = {
      id: faker.datatype.uuid(),
      ...data //PASA TODOS LOS ELEMENTOS Y LOS COMBINA
    }
    this.recommendeds.push(newrecommended);
    return newrecommended;
  }

  //FIND SPECIFIC ACCOUNT
  findOne(id){
    const recommended = this.recommendeds.find((item) => item.id === id)
    if(!recommended)
      throw boom.notFound('La cuenta no fue encontrada');
    return recommended;

  }

  //EDIT SPECIFIC ACCOUNT
  update(id, changes){
    const index = this.recommendeds.findIndex(item => item.id === id);
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");
    
    var currentrecommended = this.recommendeds[index];
    this.recommendeds[index] =  {
      ...currentrecommended, 
      ...changes
    };

    return {
      old : currentrecommended, 
      changed: this.recommendeds[index]
    };
  }

  delete(id){
    
    const index = this.recommendeds.findIndex(item => item.id === id)
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");

    const currentrecommended = this.recommendeds[index];

    this.recommendeds.splice(index, 1);
    return currentrecommended
  }
   
}

module.exports = RecommendedService;