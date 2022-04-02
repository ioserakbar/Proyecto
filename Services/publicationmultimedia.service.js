const PublicationMultimediaModel = require("../Models/publicationMultimedia.model")
const errNotFound = "No se logró encontrar lo buscado";
const errEmpty = "Aún no hay cuentas creadas";

const boom = require('@hapi/boom');

class PublicationMultimediaService{

  //FIND ALL INFO
  async find(limit, filter){

    let multimediaPublications = await PublicationMultimediaModel.find(filter);
    
    if(multimediaPublications == undefined || multimediaPublications == null)
      throw boom.notFound(errNotFound);
    else if (multimediaPublications.length <= 0 )
      throw boom.notFound(errEmpty);

    multimediaPublications = multimediaPublications.filter((item, index) => item && index < limit);
    return multimediaPublications;

  }

  //CREATE INFO
  async create(data){
    const newPublicationMultimedia = new PublicationMultimediaModel(data);
    await newPublicationMultimedia.save(); 
    return data;
  }

  //FIND SPECIFIC ACCOUNT
  async findOne(id){

    const publicationMultimedia = await PublicationMultimediaModel.findOne({
      _id:id
    })

    if(publicationMultimedia == undefined || publicationMultimedia == null)
      throw boom.notFound(errNotFound);
    else if (publicationMultimedia.length <= 0 )
      throw boom.notFound(errEmpty);

    return publicationMultimedia;

  }

  //EDIT SPECIFIC ACCOUNT
  async update(id, changes){

    let publicationMultimedia = await PublicationMultimediaModel.findOne({
      _id:id
    });
    
    if(publicationMultimedia == undefined || publicationMultimedia == null)
      throw boom.notFound(errNotFound);
    if(publicationMultimedia.length <= 0 )
      throw boom.notFound(errEmpty);

    let originalNotRecommended = {
      multimediaID:publicationMultimedia.multimediaID,
      publication:publicationMultimedia.publication
    };

    const {multimediaID, publication} = changes;

    if(multimediaID)
      publicationMultimedia.multimediaID = multimediaID
    if(publication)
      publicationMultimedia.publication = publication

    await publicationMultimedia.save();
    
    return {
      old : originalNotRecommended, 
      changed: publicationMultimedia
    };
  }

  async delete(id){
    
    let publicationMultimedia = await PublicationMultimediaModel.findOne({
      _id:id
    });

    const { deletedCount } = await PublicationMultimediaModel.deleteOne({
      _id:id
    });

    if(deletedCount <= 0 )
      throw boom.notFound(errEmpty);
    
    return publicationMultimedia;
  }
   
   
}

module.exports = PublicationMultimediaService;