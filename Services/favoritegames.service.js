const faker = require('faker');

const boom = require('@hapi/boom');

class FavoriteGameService{

  constructor(){
    this.FavoriteGames = [];
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
    const FavoriteGames = this.FavoriteGames.filter((item, index) => item && index < size);
    if(!FavoriteGames)
      throw boom.notFound("No se encontro el catalogo deseado");
    else if (FavoriteGames.length <= 0 )
      throw boom.notFound("Aún no hay cuentas creadas");
    return FavoriteGames;
  }

  //CREATE INFO
  create(data){
    const newFavoriteGame = {
      id: faker.datatype.uuid(),
      ...data //PASA TODOS LOS ELEMENTOS Y LOS COMBINA
    }
    this.FavoriteGames.push(newFavoriteGame);
    return newFavoriteGame;
  }

  //FIND SPECIFIC ACCOUNT
  findOne(id){
    const favoriteGame = this.FavoriteGames.find((item) => item.id === id)
    if(!favoriteGame)
      throw boom.notFound('La cuenta no fue encontrada');
    return favoriteGame;

  }

  //EDIT SPECIFIC ACCOUNT
  update(id, changes){
    const index = this.FavoriteGames.findIndex(item => item.id === id);
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");
    
    var currentFavoriteGame = this.FavoriteGames[index];
    this.FavoriteGames[index] =  {
      ...currentFavoriteGame, 
      ...changes
    };

    return {
      old : currentFavoriteGame, 
      changed: this.FavoriteGames[index]
    };
  }

  delete(id){
    
    const index = this.FavoriteGames.findIndex(item => item.id === id)
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");

    const currentFavoriteGame = this.FavoriteGames[index];

    this.FavoriteGames.splice(index, 1);
    return currentFavoriteGame
  }
   
}

module.exports = FavoriteGameService;