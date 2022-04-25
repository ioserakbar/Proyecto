const express = require('express');
const cors = require('cors');
const routerApi = require('./Routes');
const { logErrors, boomErrorHandler, errorHandler } = require('./Middlewares/error.handler');
const db = require('./db');
const { DBCONNECTION } = require('./consts.json');
const app = express();

app.use(cors());
const port = 3001;

db(DBCONNECTION);

//EL ORDEN DE INTANCIA ES IMPORTANTE
app.use(express.json()); //UTILIZAMOS JSON COMO FORMATO DE DATOS 

routerApi(app);//RUTAS DE NUESTRAS ENTIDADES
//MIDDLEWARES CODIGO INTEMEDIARIO (MANEJO DE ERRORES Y VALIDACIONES JOI)
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {

  // eslint-disable-next-line no-console
  console.log("Este es mi puerto: " + port);
});



