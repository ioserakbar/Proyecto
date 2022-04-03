const VideoPlayModel = require('../Models/user.model');

const errNotFound = "No se logró encontrar lo buscado";
const errEmpty = "Aún no hay cuentas creadas";

const boom = require('@hapi/boom');

class VideoPlayService{

   //FIND ALL INFO
   async find(limit, filter){

    let videoPlays = await VideoPlayModel.find(filter);
    
    if(videoPlays == undefined || videoPlays == null)
      throw boom.notFound(errNotFound);
    else if (videoPlays.length <= 0 )
      throw boom.notFound(errEmpty);

    videoPlays = videoPlays.filter((item, index) => item && index < limit);
    return videoPlays;

  }

  //CREATE INFO
  async create(data){
    const newVideoPlay = new VideoPlayModel(data);
    await newVideoPlay.save(); 
    return data;
  }

  //FIND SPECIFIC ACCOUNT
  async findOne(id){

    const videoPlay = await VideoPlayModel.findOne({
      _id:id
    })

    if(videoPlay == undefined || videoPlay == null)
      throw boom.notFound(errNotFound);
    else if (videoPlay.length <= 0 )
      throw boom.notFound(errEmpty);

    return videoPlay;

  }

  //EDIT SPECIFIC ACCOUNT
  async update(id, changes){

    let videoPlay = await VideoPlayModel.findOne({
      _id:id
    });
    
    if(videoPlay == undefined || videoPlay == null)
      throw boom.notFound(errNotFound);
    if(videoPlay.length <= 0 )
      throw boom.notFound(errEmpty);

    let originalVideoPlay = {
      date:videoPlay.date,
      gameID:videoPlay.gameID,
      userID:videoPlay.userID,
      content:videoPlay.content,
      multimedia:videoPlay.usermultimedia
    };

    const {date, gameID, userID, content, multimedia} = changes;

    if(date)
      videoPlay.date = date;
    if(gameID)
      videoPlay.gameID = gameID;
    if(userID)
      videoPlay.userID = userID;
    if(content)
      videoPlay.content = content;
    if(multimedia)
      videoPlay.multimedia = multimedia;

    await videoPlay.save();
    
    return {
      old : originalVideoPlay, 
      changed: videoPlay
    };
  }

  async delete(id){
    
    let videoPlay = await VideoPlayModel.findOne({
      _id:id
    });

    const { deletedCount } = await VideoPlayModel.deleteOne({
      _id:id
    });

    if(deletedCount <= 0 )
      throw boom.notFound(errEmpty);
    
    return videoPlay;
  }
   
}

module.exports = VideoPlayService;