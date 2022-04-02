const boom = require('@hapi/boom');
const CountryModel = require("../Models/country.model");

const errNotFound = "No se encontro el catalogo deseado";
const errEmpty ="Aún no hay cuentas creadas";

class CountryService{

 

  //FIND ALL INFO
  async find(limit, filter){
    let Countries = await CountryModel.find(filter);
    
    if(Countries == undefined || Countries == null)
      throw boom.notFound(errNotFound);
    else if (Countries.length <= 0 )
      throw boom.notFound(errEmpty);

    Countries = Countries.filter((item, index) => item && index < limit);
    return Countries;
  }

  //CREATE INFO
  async create(data){
    const newCountrie = new CountryModel(data);
    await newCountrie.save(); 
    return data;
  }

  //FIND SPECIFIC ACCOUNT
  async findOne(id){

    const countrie = await CountryModel.findOne({
      _id:id
    })

    if(countrie == undefined || countrie == null)
      throw boom.notFound(errNotFound);
    else if (countrie.length <= 0 )
      throw boom.notFound(errEmpty);

    return countrie;

  }

  //EDIT SPECIFIC ACCOUNT
  async update(id, changes){

    let countrie = await CountryModel.findOne({
      _id:id
    });

    if(countrie == undefined || countrie == null)
      throw boom.notFound(errNotFound);
    if(countrie.length <= 0 )
      throw boom.notFound(errEmpty);

    let originalCountrie = {
      name:countrie.name,
      flag:countrie.flag
    };

    const {name, flag} = changes;

    if(name)
    countrie.name = name
    if(flag)
    countrie.flag = flag

    await countrie.save();
    return {
      old : originalCountrie, 
      changed: countrie
    };
  }

  async delete(id){
    
    let countrie = await CountryModel.findOne({
      _id:id
    });

    const { deletedCount } = await CountryModel.deleteOne({
      _id:id
    });

    if(deletedCount <= 0 )
      throw boom.notFound(errEmpty);
    
    return countrie;
  }
   
}

module.exports = CountryService;