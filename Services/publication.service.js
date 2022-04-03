const PublicationModel = require("../Models/publication.model")
const errNotFound = "No se logró encontrar lo buscado";
const errEmpty = "Aún no hay cuentas creadas";

const boom = require('@hapi/boom');

class PublicationService{

  //FIND ALL INFO
  async find(limit, filter){

    let publications = await PublicationModel.find(filter);
    
    if(publications == undefined || publications == null)
      throw boom.notFound(errNotFound);
    else if (publications.length <= 0 )
      throw boom.notFound(errEmpty);

    publications = publications.filter((item, index) => item && index < limit);
    return publications;

  }

  //CREATE INFO
  async create(data){
    const newPublication = new PublicationModel(data);
    await newPublication.save(); 
    return data;
  }

  //FIND SPECIFIC ACCOUNT
  async findOne(id){

    const publication = await PublicationModel.findOne({
      _id:id
    })

    if(publication == undefined || publication == null)
      throw boom.notFound(errNotFound);
    else if (publication.length <= 0 )
      throw boom.notFound(errEmpty);

    return publication;

  }

  //EDIT SPECIFIC ACCOUNT
  async update(id, changes){

    let publication = await PublicationModel.findOne({
      _id:id
    });
    
    if(publication == undefined || publication == null)
      throw boom.notFound(errNotFound);
    if(publication.length <= 0 )
      throw boom.notFound(errEmpty);

    let originalNotRecommended = {
      date:publication.date,
      content:publication.content,
      userID:publication.userID,
      multimedia: publication.multimedia
    };

    const {date, content, userID, multimedia} = changes;

    if(date)
      publication.date = date
    if(content)
      publication.content = content
    if(userID)
      publication.content = userID
    if(multimedia)
      publication.multimedia = multimedia
    await publication.save();
    
    return {
      old : originalNotRecommended, 
      changed: publication
    };
  }

  async delete(id){
    
    let publication = await PublicationModel.findOne({
      _id:id
    });

    const { deletedCount } = await PublicationModel.deleteOne({
      _id:id
    });

    if(deletedCount <= 0 )
      throw boom.notFound(errEmpty);
    
    return publication;
  }
   
}

module.exports = PublicationService;