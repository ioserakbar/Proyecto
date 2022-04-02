const ScheduleModel = require("../Models/schedule.model")
const errNotFound = "No se logró encontrar lo buscado";
const errEmpty = "Aún no hay cuentas creadas";

const boom = require('@hapi/boom');

class ScheduleService{

  //FIND ALL INFO
  async find(limit, filter){

    let schedules = await ScheduleModel.find(filter);
    
    if(schedules == undefined || schedules == null)
      throw boom.notFound(errNotFound);
    else if (schedules.length <= 0 )
      throw boom.notFound(errEmpty);

    schedules = schedules.filter((item, index) => item && index < limit);
    return schedules;

  }

  //CREATE INFO
  async create(data){
    const newSchedule = new ScheduleModel(data);
    await newSchedule.save(); 
    return data;
  }

  //FIND SPECIFIC ACCOUNT
  async findOne(id){

    const schedule = await ScheduleModel.findOne({
      _id:id
    })

    if(schedule == undefined || schedule == null)
      throw boom.notFound(errNotFound);
    else if (schedule.length <= 0 )
      throw boom.notFound(errEmpty);

    return schedule;

  }

  //EDIT SPECIFIC ACCOUNT
  async update(id, changes){

    let schedule = await ScheduleModel.findOne({
      _id:id
    });
    
    if(schedule == undefined || schedule == null)
      throw boom.notFound(errNotFound);
    if(schedule.length <= 0 )
      throw boom.notFound(errEmpty);

    let originalSchedule = {
      lunes:schedule.lunes,
      martes:schedule.martes,
      miercoles:schedule.miercoles,
      jueves:schedule.userID,
      viernes:schedule.userID,
      sabado:schedule.sabado,
      domingo:schedule.domingo
    };

    const {lunes, martes, miercoles, jueves, viernes, sabado, domingo} = changes;

    if(lunes)
      schedule.lunes = lunes
    if(martes)
      schedule.martes = martes
    if(miercoles)
      schedule.miercoles = miercoles
    if(jueves)
      schedule.jueves = jueves
    if(viernes)
      schedule.viernes = viernes
    if(sabado)
      schedule.sabado = sabado
    if(domingo)
      schedule.domingo = domingo

    await schedule.save();
    
    return {
      old : originalSchedule, 
      changed: schedule
    };
  }

  async delete(id){
    
    let schedule = await ScheduleModel.findOne({
      _id:id
    });

    const { deletedCount } = await ScheduleModel.deleteOne({
      _id:id
    });

    if(deletedCount <= 0 )
      throw boom.notFound(errEmpty);
    
    return schedule;
  }
   
   
}

module.exports = ScheduleService;