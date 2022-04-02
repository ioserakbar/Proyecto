
const boom = require('@hapi/boom');
const MessageModel = require("../Models/multimedia.model")
const errNotFound = "No se logró encontrar lo buscado";
const errEmpty = "Aún no hay cuentas creadas";
class MultimediaService{
  //FIND ALL INFO
  async find(limit, filter){

    let multimedias = await MessageModel.find(filter);
    

    if(multimedias == undefined || multimedias == null)
      throw boom.notFound(errNotFound);
    else if (multimedias.length <= 0 )
      throw boom.notFound(errEmpty);

    multimedias = multimedias.filter((item, index) => item && index < limit);
    return multimedias;

  }

  //CREATE INFO
  async create(data){
    const newMultimedia = new MessageModel(data);
    await newMultimedia.save(); 
    return data;
  }

  //FIND SPECIFIC ACCOUNT
  async findOne(id){

    const multimedia = await MessageModel.findOne({
      _id:id
    })

    if(multimedia == undefined || multimedia == null)
      throw boom.notFound(errNotFound);
    else if (multimedia.length <= 0 )
      throw boom.notFound(errEmpty);

    return multimedia;

  }

  //EDIT SPECIFIC ACCOUNT
  async update(id, changes){

    let multimedia = await MessageModel.findOne({
      _id:id
    });
    
    if(multimedia == undefined || multimedia == null)
      throw boom.notFound(errNotFound);
    if(multimedia.length <= 0 )
      throw boom.notFound(errEmpty);

    let originalMultimedia = {
      path:multimedia.content,
      extention:multimedia.multimediaID,
    };

    const {path, extention} = changes;

    if(path)
      multimedia.path = path
    if(extention)
      multimedia.extention = extention

    await multimedia.save();
    
    return {
      old : originalMultimedia, 
      changed: multimedia
    };
  }

  async delete(id){
    
    let multimedia = await MessageModel.findOne({
      _id:id
    });

    const { deletedCount } = await MessageModel.deleteOne({
      _id:id
    });

    if(deletedCount <= 0 )
      throw boom.notFound(errEmpty);
    
    return multimedia;
  }
    
   
}

module.exports = MultimediaService;