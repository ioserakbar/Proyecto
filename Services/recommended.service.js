const RecommendedModel = require("../Models/recommended.model")
const errNotFound = "No se logró encontrar lo buscado";
const errEmpty = "Aún no hay cuentas creadas";

const boom = require('@hapi/boom');

class RecommendedService{

  //FIND ALL INFO
  async find(limit, filter){

    let recommendeds = await RecommendedModel.find(filter);
    
    if(recommendeds == undefined || recommendeds == null)
      throw boom.notFound(errNotFound);
    else if (recommendeds.length <= 0 )
      throw boom.notFound(errEmpty);

    recommendeds = recommendeds.filter((item, index) => item && index < limit);
    return recommendeds;

  }

  //CREATE INFO
  async create(data){
    const newRecommended = new RecommendedModel(data);
    await newRecommended.save(); 
    return data;
  }

  //FIND SPECIFIC ACCOUNT
  async findOne(id){

    const recommended = await RecommendedModel.findOne({
      _id:id
    })

    if(recommended == undefined || recommended == null)
      throw boom.notFound(errNotFound);
    else if (recommended.length <= 0 )
      throw boom.notFound(errEmpty);

    return recommended;

  }

  //EDIT SPECIFIC ACCOUNT
  async update(id, changes){

    let recommended = await RecommendedModel.findOne({
      _id:id
    });
    
    if(recommended == undefined || recommended == null)
      throw boom.notFound(errNotFound);
    if(recommended.length <= 0 )
      throw boom.notFound(errEmpty);

    let originalRecommended = {
      recommendedUser:recommended.recommendedUser,
      userID:recommended.userID
    };

    const {recommendedUser, userID} = changes;

    if(recommendedUser)
      recommended.recommendedUser = recommendedUser
    if(userID)
      recommended.userID = userID

    await recommended.save();
    
    return {
      old : originalRecommended, 
      changed: recommended
    };
  }

  async delete(id){
    
    let recommended = await RecommendedModel.findOne({
      _id:id
    });

    const { deletedCount } = await RecommendedModel.deleteOne({
      _id:id
    });

    if(deletedCount <= 0 )
      throw boom.notFound(errEmpty);
    
    return recommended;
  }
   
}

module.exports = RecommendedService;