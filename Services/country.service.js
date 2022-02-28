const faker = require('faker');

const boom = require('@hapi/boom');

class CountryService{

  constructor(){
    this.Countries = [];
    this.generate();
  }

  //GENERATE RANDOM INFO 
  generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++)
      this.Countries.push({
        id: faker.datatype.uuid(),
        name: faker.address.country(),
        flag: faker.image.image()
      });   
  }

  //FIND ALL INFO
  find(size){
    const Countries = this.Countries.filter((item, index) => item && index < size);
    if(!Countries)
      throw boom.notFound("No se encontro el catalogo deseado");
    else if (Countries.length <= 0 )
      throw boom.notFound("Aún no hay cuentas creadas");
    return Countries;
  }

  //CREATE INFO
  create(data){
    const newCountry = {
      id: faker.datatype.uuid(),
      ...data //PASA TODOS LOS ELEMENTOS Y LOS COMBINA
    }
    this.Countries.push(newCountry);
    return newCountry;
  }

  //FIND SPECIFIC ACCOUNT
  findOne(id){
    const country = this.Countries.find((item) => item.id === id)
    if(!country)
      throw boom.notFound('La cuenta no fue encontrada');
    return country;

  }

  //EDIT SPECIFIC ACCOUNT
  update(id, changes){
    const index = this.Countries.findIndex(item => item.id === id);
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");
    
    var currentCountry = this.Countries[index];
    this.Countries[index] =  {
      ...currentCountry, 
      ...changes
    };

    return {
      old : currentCountry, 
      changed: this.Countries[index]
    };
  }

  delete(id){
    
    const index = this.Countries.findIndex(item => item.id === id)
    if(index === -1)
      throw boom.notFound("La cuenta no fue encontrada");

    const currentCountry = this.Countries[index];

    this.Countries.splice(index, 1);
    return currentCountry
  }
   
}

module.exports = CountryService;