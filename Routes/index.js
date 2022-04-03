const express = require('express');
const chatroomRouter = require('./chatroom.router');
const commentRouter = require('./comment.router');
const countryRouter = require('./country.router');
const gameRouter = require('./game.router');
const messageRouter = require('./message.router');
const notRecommendedRouter = require('./notRecommended.router');
const publicationRouter = require('./publication.router');
const recommendedRouter = require('./recommended.router');
const userRouter = require('./user.router');
const videoPlayRouter = require('./videoplay.router');

const routerApi = (app) => {

  const router = express.Router();
  app.use('/api/v1', router);
  //endpints de la v1
  router.use('/chatroom', chatroomRouter);
  router.use('/comment', commentRouter);
  router.use('/country', countryRouter);
  router.use('/game', gameRouter);
  router.use('/message', messageRouter);
  router.use('/notRecommended', notRecommendedRouter);
  router.use('/publication', publicationRouter);
  router.use('/recommended', recommendedRouter);
  router.use('/user', userRouter);
  router.use('/videoPlay', videoPlayRouter);
}

module.exports = routerApi;