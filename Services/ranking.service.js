const faker = require('faker');

const boom = require('@hapi/boom');

class RankingService{

  constructor(){
    this.rankings = [];
    this.generate();
  }

  //GENERATE RANDOM INFO 
  generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++)
      this.rankings.push({
        id: faker.datatype.uuid(),
        gameID: faker.datatype.uuid(),
        name: faker.name.findName(),
        image: faker.image.image(),
        index: faker.random.number()
      });   
  }

  //FIND ALL INFO
  find(size){
    const rankings = this.rankings.filter((item, index) => item && index < size);
    if(!rankings)
      throw boom.notFound("No se encontro el catalogo deseado");
    else if (rankings.length <= 0 )
      throw boom.notFound("Aún no hay cuentas creadas");
    return rankings;
  }

  //CREATE INFO
  create(data){
    const newranking = {
      id: faker.datatype.uuid(),
      ...data //PASA TODOS LOS ELEMENTOS Y LOS COMBINA
    }
    this.rankings.push(newranking);
    return newranking;
  }

  //FIND SPECIFIC ACCOUNT
  findOne(id){
    const ranking = this.rankings.find((item) => item.id === id)
    if(!ranking)
      throw boom.notFound('La cuenta no fue encontrada');
    return ranking;

  }

  //EDIT SPECIFIC ACCOUNT
  update(id, changes){
    const index = this.rankings.findIndex(item => item.id === id);
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");
    
    var currentranking = this.rankings[index];
    this.rankings[index] =  {
      ...currentranking, 
      ...changes
    };

    return {
      old : currentranking, 
      changed: this.rankings[index]
    };
  }

  delete(id){
    
    const index = this.rankings.findIndex(item => item.id === id)
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");

    const currentranking = this.rankings[index];

    this.rankings.splice(index, 1);
    return currentranking
  }
   
}

module.exports = RankingService;