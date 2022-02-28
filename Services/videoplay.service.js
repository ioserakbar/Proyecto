const faker = require('faker');

const boom = require('@hapi/boom');

class VideoPlayService{

  constructor(){
    this.videoPlays = [];
    this.generate();
  }

  //GENERATE RANDOM INFO 
  generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++)
      this.accounts.push({
        id: faker.datatype.uuid(),
        commentID: faker.datatype.uuid(),
        multimediaID: faker.datatype.uuid()
      });   
  }

  //FIND ALL INFO
  find(size){
    const videoPlays = this.videoPlays.filter((item, index) => item && index < size);
    if(!videoPlays)
      throw boom.notFound("No se encontro el catalogo deseado");
    else if (videoPlays.length <= 0 )
      throw boom.notFound("Aún no hay cuentas creadas");
    return videoPlays;
  }

  //CREATE INFO
  create(data){
    const newvideoPlay = {
      id: faker.datatype.uuid(),
      ...data //PASA TODOS LOS ELEMENTOS Y LOS COMBINA
    }
    this.videoPlays.push(newvideoPlay);
    return newvideoPlay;
  }

  //FIND SPECIFIC ACCOUNT
  findOne(id){
    const videoPlay = this.videoPlays.find((item) => item.id === id)
    if(!videoPlay)
      throw boom.notFound('La cuenta no fue encontrada');
    return videoPlay;

  }

  //EDIT SPECIFIC ACCOUNT
  update(id, changes){
    const index = this.videoPlays.findIndex(item => item.id === id);
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");
    
    var currentvideoPlay = this.videoPlays[index];
    this.videoPlays[index] =  {
      ...currentvideoPlay, 
      ...changes
    };

    return {
      old : currentvideoPlay, 
      changed: this.videoPlays[index]
    };
  }

  delete(id){
    
    const index = this.videoPlays.findIndex(item => item.id === id)
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");

    const currentvideoPlay = this.videoPlays[index];

    this.videoPlays.splice(index, 1);
    return currentvideoPlay
  }
   
}

module.exports = VideoPlayService;