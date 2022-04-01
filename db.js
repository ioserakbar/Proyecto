const db = require('mongoose');
db.Promise = global.Promise;

const connect = async (url)=>{
  await db.connect(url, {
    useNewUrlParser: true
  });
  // eslint-disable-next-line no-console
  console.log('Se ha conectado a la base de datos')
  
}

module.exports = connect;