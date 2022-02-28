const express = require('express');
const routerApi = require('./routes');
//const { logErrors, boomErrorHandler, errorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

//EL ORDEN DE INTANCIA ES IMPORTANTE
app.use(express.json()); //UTILIZAMOS JSON COMO FORMATO DE DATOS 
routerApi(app);//RUTAS DE NUESTRAS ENTIDADES
//MIDDLEWARES CODIGO INTEMEDIARIO (MANEJO DE ERRORES Y VALIDACIONES JOI)
// app.use(logErrors);
// app.use(boomErrorHandler);
// app.use(errorHandler);


app.listen(port, () =>{
  
  // eslint-disable-next-line no-console
  console.log("este es mi puerto: " + port);
});




