const boom = require('@hapi/boom');
const CommentMultimediaModel = require('../Models/commentmultimedia.model');

const errNotFound = "No se logró encontrar lo buscado";
const errEmpty = "Aún no hay cuentas creadas";

class CommentMultimediService{

  //FIND ALL INFO
  async find(limit, filter){
    
    let MultimediaComments = await CommentMultimediaModel.find(filter);
    
    if(MultimediaComments == undefined || MultimediaComments == null)
      throw boom.notFound(errNotFound);
    if(MultimediaComments.length <= 0 )
      throw boom.notFound(errEmpty);

    MultimediaComments = MultimediaComments.filter((item, index) => item && index < limit);
    
    return MultimediaComments;

  }

  //CREATE INFO
  async create(data){

    const newMultimediaComment = new CommentMultimediaModel(data);
    await newMultimediaComment.save(); 
    return data;
  }

  //FIND SPECIFIC ACCOUNT
  async findOne(id){
    const MultimediaComment = await CommentMultimediaModel.findOne({
      _id:id
    })

    if(MultimediaComment == undefined || MultimediaComment == null)
      throw boom.notFound(errNotFound);
    if(MultimediaComment.length <= 0 )
      throw boom.notFound(errEmpty);

    return MultimediaComment;

  }

  //EDIT SPECIFIC ACCOUNT
  async update(id, changes){
    
    let MultimediaComment = await CommentMultimediaModel.findOne({
      _id:id
    });

    if(MultimediaComment == undefined || MultimediaComment == null)
      throw boom.notFound(errNotFound);
    if(MultimediaComment.length <= 0 )
      throw boom.notFound(errEmpty);

    let originalMultimediaComment = {
      commentID:MultimediaComment.commentID,
      multimediaID:MultimediaComment.multimediaID
    };

    const {commentID, multimediaID} = changes;

    if(commentID)
      MultimediaComment.commentID = commentID
    if(multimediaID)
      MultimediaComment.multimediaID = multimediaID

    await MultimediaComment.save();
    
    return {
      old : originalMultimediaComment, 
      changed: MultimediaComment
    };
  }

  async delete(id){
    let MultimediaComment = await CommentMultimediaModel.findOne({
      _id:id
    });

    const { deletedCount } = await CommentMultimediaModel.deleteOne({
      _id:id
    });

    if(deletedCount <= 0 )
      throw boom.notFound(errEmpty);
    
    return MultimediaComment;
  }
   
}

module.exports = CommentMultimediService;