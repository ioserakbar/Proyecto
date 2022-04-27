
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const cors = require('cors');
const routerApi = require('./Routes');
const { logErrors, boomErrorHandler, errorHandler } = require('./Middlewares/error.handler');
const db = require('./db');
const { DBCONNECTION } = require('./consts.json');
const app = express();
const bodyParser = require('body-parser');
const port = 3001;


app.use(cors());

db(DBCONNECTION);

//EL ORDEN DE INTANCIA ES IMPORTANTE
app.use(bodyParser.json()); //UTILIZAMOS JSON COMO FORMATO DE DATOS 
app.use(bodyParser.urlencoded({ extended: false }));

routerApi(app);//RUTAS DE NUESTRAS ENTIDADES
//MIDDLEWARES CODIGO INTEMEDIARIO (MANEJO DE ERRORES Y VALIDACIONES JOI)
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {

  // eslint-disable-next-line no-console
  console.log("Este es mi puerto: " + port);
});

