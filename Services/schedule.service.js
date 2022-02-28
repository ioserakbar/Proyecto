const faker = require('faker');

const boom = require('@hapi/boom');

class ScheduleService{

  constructor(){
    this.schedules = [];
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
    const schedules = this.schedules.filter((item, index) => item && index < size);
    if(!schedules)
      throw boom.notFound("No se encontro el catalogo deseado");
    else if (schedules.length <= 0 )
      throw boom.notFound("Aún no hay cuentas creadas");
    return schedules;
  }

  //CREATE INFO
  create(data){
    const newschedule = {
      id: faker.datatype.uuid(),
      ...data //PASA TODOS LOS ELEMENTOS Y LOS COMBINA
    }
    this.schedules.push(newschedule);
    return newschedule;
  }

  //FIND SPECIFIC ACCOUNT
  findOne(id){
    const schedule = this.schedules.find((item) => item.id === id)
    if(!schedule)
      throw boom.notFound('La cuenta no fue encontrada');
    return schedule;

  }

  //EDIT SPECIFIC ACCOUNT
  update(id, changes){
    const index = this.schedules.findIndex(item => item.id === id);
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");
    
    var currentschedule = this.schedules[index];
    this.schedules[index] =  {
      ...currentschedule, 
      ...changes
    };

    return {
      old : currentschedule, 
      changed: this.schedules[index]
    };
  }

  delete(id){
    
    const index = this.schedules.findIndex(item => item.id === id)
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");

    const currentschedule = this.schedules[index];

    this.schedules.splice(index, 1);
    return currentschedule
  }
   
}

module.exports = ScheduleService;