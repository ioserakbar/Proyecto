const express = require('express');
const accountsRouter = require('./account.router');
const chatroomRouter = require('./chatroom.router');
const commentRouter = require('./comment.router');
const commentMultimediaRouter = require('./commentmultimedia.router');
const countryRouter = require('./country.router');
const favoriteGamesRouter = require('./favoritegames.router');
const friendRouter = require('./friend.router');
const gameRouter = require('./game.router');
const linkedAccountRouter = require('./linkedaccount.router');
const messageRouter = require('./message.router');
const multimediaRouter = require('./multimedia.router');
const notRecommendedRouter = require('./notRecommended.router');
const recommendedRouter = require('./recommended.router');
const scheduleRouter = require('./schedule.router');
const userRouter = require('./user.router');
const videoPlayRouter = require('./videoplay.router');

const routerApi = (app) =>{

  const router = express.Router();
  app.use('/api/v1', router);
  //endpints de la v1
  router.use('/account', accountsRouter);
  router.use('/chatroom', chatroomRouter);
  router.use('/comment', commentRouter);
  router.use('/commentMultimedia', commentMultimediaRouter);
  router.use('/country', countryRouter);
  router.use('/favoriteGames', favoriteGamesRouter);
  router.use('/friend', friendRouter);
  router.use('/game', gameRouter);
  router.use('/linkedaccount', linkedAccountRouter);
  router.use('/message', messageRouter);
  router.use('/multimedia', multimediaRouter);
  router.use('/notRecommended', notRecommendedRouter);
  router.use('/recommended', recommendedRouter);
  router.use('/schedule', scheduleRouter);
  router.use('/user', userRouter);
  router.use('/videoPlay', videoPlayRouter);
}

module.exports = routerApi;