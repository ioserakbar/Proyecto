const boom = require('@hapi/boom');

const CommentModel = require('../Models/comment.model');

const errNotFound = "No se logró encontrar lo buscado";
const errEmpty = "Aún no hay cuentas creadas";


class CommentService{

  //FIND ALL INFO
  async find(limit, filter){
    
    let comments = await CommentModel.find(filter);
    
    if(comments == undefined || comments == null)
      throw boom.notFound(errNotFound);
    if(comments.length <= 0 )
      throw boom.notFound(errEmpty);

    comments = comments.filter((item, index) => item && index < limit);
    
    return comments;

  }

  //CREATE INFO
  async create(data){

    const newComment = new CommentModel(data);
    await newComment.save(); 
    return data;
  }

  //FIND SPECIFIC ACCOUNT
  async findOne(id){
    const comment = await CommentModel.findOne({
      _id:id
    })

    if(comment == undefined || comment == null)
      throw boom.notFound(errNotFound);
    if(comment.length <= 0 )
      throw boom.notFound(errEmpty);

    return comment;

  }

  //EDIT SPECIFIC ACCOUNT
  async update(id, changes){
    
    let comment = await CommentModel.findOne({
      _id:id
    });

    if(comment == undefined || comment == null)
      throw boom.notFound(errNotFound);
    if(comment.length <= 0 )
      throw boom.notFound(errEmpty);

    let originalComment = {
      publicationID:comment.publicationID,
      userID:comment.userID,
      content:comment.content,
      multimedia:comment.multimedia,
      date:comment.date,
      stats:comment.stats
    };

    const {publicationID, userID, content, multimedia, date, stats} = changes;

    if(publicationID)
      comment.publicationID = publicationID;
    if(userID)
      comment.userID = userID;
    if(content)
      comment.content = content;
    if(multimedia)
      comment.multimedia = multimedia;
    if(date)
      comment.date = date;
    if(stats)
      comment.stats = stats;

    await comment.save();
    
    return {
      old : originalComment, 
      changed: comment
    };
  }

  async delete(id){
    let comment = await CommentModel.findOne({
      _id:id
    });

    const { deletedCount } = await CommentModel.deleteOne({
      _id:id
    });

    if(deletedCount <= 0 )
      throw boom.notFound(errEmpty);
    
    return comment;
  }
   
}

module.exports = CommentService;