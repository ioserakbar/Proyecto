const boom = require('@hapi/boom');

const NotRecommendedModel = require("../Models/notrecommended.model")
const errNotFound = "No se logró encontrar lo buscado";
const errEmpty = "Aún no hay cuentas creadas";
class NotRecommendedService{

  //FIND ALL INFO
  async find(limit, filter){

    let notRecommendeds = await NotRecommendedModel.find(filter);
    

    if(notRecommendeds == undefined || notRecommendeds == null)
      throw boom.notFound(errNotFound);
    else if (notRecommendeds.length <= 0 )
      throw boom.notFound(errEmpty);

    notRecommendeds = notRecommendeds.filter((item, index) => item && index < limit);
    return notRecommendeds;

  }

  //CREATE INFO
  async create(data){
    const NewNotRecommended = new NotRecommendedModel(data);
    await NewNotRecommended.save(); 
    return data;
  }

  //FIND SPECIFIC ACCOUNT
  async findOne(id){

    const notRecommended = await NotRecommendedModel.findOne({
      _id:id
    })

    if(notRecommended == undefined || notRecommended == null)
      throw boom.notFound(errNotFound);
    else if (notRecommended.length <= 0 )
      throw boom.notFound(errEmpty);

    return notRecommended;

  }

  //EDIT SPECIFIC ACCOUNT
  async update(id, changes){

    let notRecommended = await NotRecommendedModel.findOne({
      _id:id
    });
    
    if(notRecommended == undefined || notRecommended == null)
      throw boom.notFound(errNotFound);
    if(notRecommended.length <= 0 )
      throw boom.notFound(errEmpty);

    let originalNotRecommended = {
      notRecommendedUser:notRecommended.notRecommendedUser,
      userID:notRecommended.userID,
    };

    const {notRecommendedUser, userID} = changes;

    if(notRecommendedUser)
      notRecommended.notRecommendedUser = notRecommendedUser
    if(userID)
      notRecommended.userID = userID

    await notRecommended.save();
    
    return {
      old : originalNotRecommended, 
      changed: notRecommended
    };
  }

  async delete(id){
    
    let notRecommended = await NotRecommendedModel.findOne({
      _id:id
    });

    const { deletedCount } = await NotRecommendedModel.deleteOne({
      _id:id
    });

    if(deletedCount <= 0 )
      throw boom.notFound(errEmpty);
    
    return notRecommended;
  }
   
}

module.exports = NotRecommendedService;