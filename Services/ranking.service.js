const RankingModel = require("../Models/ranking.model")
const errNotFound = "No se logró encontrar lo buscado";
const errEmpty = "Aún no hay cuentas creadas";

const boom = require('@hapi/boom');

class RankingService{

  //FIND ALL INFO
  async find(limit, filter){

    let rankings = await RankingModel.find(filter);
    
    if(rankings == undefined || rankings == null)
      throw boom.notFound(errNotFound);
    else if (rankings.length <= 0 )
      throw boom.notFound(errEmpty);

    rankings = rankings.filter((item, index) => item && index < limit);
    return rankings;

  }

  //CREATE INFO
  async create(data){
    const newRanking = new RankingModel(data);
    await newRanking.save(); 
    return data;
  }

  //FIND SPECIFIC ACCOUNT
  async findOne(id){

    const ranking = await RankingModel.findOne({
      _id:id
    })

    if(ranking == undefined || ranking == null)
      throw boom.notFound(errNotFound);
    else if (ranking.length <= 0 )
      throw boom.notFound(errEmpty);

    return ranking;

  }

  //EDIT SPECIFIC ACCOUNT
  async update(id, changes){

    let ranking = await RankingModel.findOne({
      _id:id
    });
    
    if(ranking == undefined || ranking == null)
      throw boom.notFound(errNotFound);
    if(ranking.length <= 0 )
      throw boom.notFound(errEmpty);

    let originalRanking = {
      gameID:ranking.gameID,
      name:ranking.name,
      image:ranking.image,
      index:ranking.index,
    };

    const {gameID, name, image, index} = changes;

    if(gameID)
      ranking.gameID = gameID
    if(name)
      ranking.name = name
    if(image)
      ranking.image = image
    if(index)
      ranking.index = index

    await ranking.save();
    
    return {
      old : originalRanking, 
      changed: ranking
    };
  }

  async delete(id){
    
    let ranking = await RankingModel.findOne({
      _id:id
    });

    const { deletedCount } = await RankingModel.deleteOne({
      _id:id
    });

    if(deletedCount <= 0 )
      throw boom.notFound(errEmpty);
    
    return ranking;
  }
 
}

module.exports = RankingService;