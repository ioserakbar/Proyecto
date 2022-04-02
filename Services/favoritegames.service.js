const boom = require('@hapi/boom');

const FavoriteGameModel = require('../Models/favoritegames.model');

const errNotFound = "No se logró encontrar lo buscado";
const errEmpty = "Aún no hay cuentas creadas";
class FavoriteGameService{

  //FIND ALL INFO
  async find(limit, filter){

    let favoritesGames = await FavoriteGameModel.find(filter);
    

    if(favoritesGames == undefined || favoritesGames == null)
      throw boom.notFound(errNotFound);
    else if (favoritesGames.length <= 0 )
      throw boom.notFound(errEmpty);

    favoritesGames = favoritesGames.filter((item, index) => item && index < limit);
    return favoritesGames;

  }

  //CREATE INFO
  async create(data){
    const newFavoriteGame = new FavoriteGameModel(data);
    await newFavoriteGame.save(); 
    return data;
  }

  //FIND SPECIFIC ACCOUNT
  async findOne(id){

    const favoriteGame = await FavoriteGameModel.findOne({
      _id:id
    })

    if(favoriteGame == undefined || favoriteGame == null)
      throw boom.notFound(errNotFound);
    else if (favoriteGame.length <= 0 )
      throw boom.notFound(errEmpty);

    return favoriteGame;

  }

  //EDIT SPECIFIC ACCOUNT
  async update(id, changes){

    let favoriteGame = await FavoriteGameModel.findOne({
      _id:id
    });
    
    if(favoriteGame == undefined || favoriteGame == null)
      throw boom.notFound(errNotFound);
    if(favoriteGame.length <= 0 )
      throw boom.notFound(errEmpty);

    let originalFavoriteGame = {
      gameID:favoriteGame.gameID,
      userID:favoriteGame.userID,
      ranked:favoriteGame.ranked,
      timePlayed:favoriteGame.timePlayed,
    };

    const {gameID, userID, ranked, timePlayed} = changes;

    if(gameID)
      favoriteGame.gameID = gameID
    if(userID)
      favoriteGame.userID = userID
    if(ranked)
      favoriteGame.ranked = ranked
    if(timePlayed)
      favoriteGame.timePlayed = timePlayed;

    await favoriteGame.save();
    
    return {
      old : originalFavoriteGame, 
      changed: favoriteGame
    };
  }

  async delete(id){
    
    let favoriteGame = await FavoriteGameModel.findOne({
      _id:id
    });

    const { deletedCount } = await FavoriteGameModel.deleteOne({
      _id:id
    });

    if(deletedCount <= 0 )
      throw boom.notFound(errEmpty);
    
    return favoriteGame;
  }
   
   
}

module.exports = FavoriteGameService;