const express = require('express');
const accountsRouter = require('./account.router');

const routerApi = (app) =>{

    const router = express.Router();
    app.use('/api/v1', router);
    //endpints de la v1
    router.use('/account', accountsRouter);
}

module.exports = routerApi;