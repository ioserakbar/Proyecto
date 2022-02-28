const faker = require('faker');

const boom = require('@hapi/boom');

class GameService{

  constructor(){
    this.Games = [];
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
    const Games = this.Games.filter((item, index) => item && index < size);
    if(!Games)
      throw boom.notFound("No se encontro el catalogo deseado");
    else if (Games.length <= 0 )
      throw boom.notFound("Aún no hay cuentas creadas");
    return Games;
  }

  //CREATE INFO
  create(data){
    const newGame = {
      id: faker.datatype.uuid(),
      ...data //PASA TODOS LOS ELEMENTOS Y LOS COMBINA
    }
    this.Games.push(newGame);
    return newGame;
  }

  //FIND SPECIFIC ACCOUNT
  findOne(id){
    const game = this.Games.find((item) => item.id === id)
    if(!game)
      throw boom.notFound('La cuenta no fue encontrada');
    return game;

  }

  //EDIT SPECIFIC ACCOUNT
  update(id, changes){
    const index = this.Games.findIndex(item => item.id === id);
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");
    
    var currentGame = this.Games[index];
    this.Games[index] =  {
      ...currentGame, 
      ...changes
    };

    return {
      old : currentGame, 
      changed: this.Games[index]
    };
  }

  delete(id){
    
    const index = this.Games.findIndex(item => item.id === id)
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");

    const currentGame = this.Games[index];

    this.Games.splice(index, 1);
    return currentGame
  }
   
}

module.exports = GameService;