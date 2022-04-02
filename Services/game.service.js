const GameModel = require("../Models/game.model")
const boom = require('@hapi/boom');

const errNotFound = "No se logró encontrar lo buscado";
const errEmpty = "Aún no hay cuentas creadas";
class GameService{

  //FIND ALL INFO
  async find(limit, filter){

    let games = await GameModel.find(filter);
    

    if(games == undefined || games == null)
      throw boom.notFound(errNotFound);
    else if (games.length <= 0 )
      throw boom.notFound(errEmpty);

    games = games.filter((item, index) => item && index < limit);
    return games;

  }

  //CREATE INFO
  async create(data){
    const newGame = new GameModel(data);
    await newGame.save(); 
    return data;
  }

  //FIND SPECIFIC ACCOUNT
  async findOne(id){

    const game = await GameModel.findOne({
      _id:id
    })

    if(game == undefined || game == null)
      throw boom.notFound(errNotFound);
    else if (game.length <= 0 )
      throw boom.notFound(errEmpty);

    return game;

  }

  //EDIT SPECIFIC ACCOUNT
  async update(id, changes){

    let game = await GameModel.findOne({
      _id:id
    });
    
    if(game == undefined || game == null)
      throw boom.notFound(errNotFound);
    if(game.length <= 0 )
      throw boom.notFound(errEmpty);

    let originalGame = {
      name:game.name,
      developers:game.developers,
      image:game.image
    };

    const {name, developers, image} = changes;

    if(name)
      game.name = name
    if(developers)
      game.developers = developers
    if(image)
      game.image = image

    await game.save();
    
    return {
      old : originalGame, 
      changed: game
    };
  }

  async delete(id){
    
    let game = await GameModel.findOne({
      _id:id
    });

    const { deletedCount } = await GameModel.deleteOne({
      _id:id
    });

    if(deletedCount <= 0 )
      throw boom.notFound(errEmpty);
    
    return game;
  }
   
}

module.exports = GameService;