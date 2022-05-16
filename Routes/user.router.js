const express = require('express');
const router = express.Router();
const Service = require('../Services/user.service');
const service = new Service();
const validatorHandler = require('./../Middlewares/validator.handler')
const { createUserSchema, updateUserSchema, getValidUser } = require('../Schemas/user.schema');
const faker = require('faker');
const { MULTIMEDIAURL, MULTIMEDIAPROFILEPICS } = require('../consts.json');
const azureStorage = require('azure-storage');
const blobService = azureStorage.createBlobService();
const container = MULTIMEDIAPROFILEPICS.split('/')[0]
const jwt = require('jsonwebtoken');
const ensureToken = require('../Middlewares/ensureToken.handler');

//GET ALL PRODUCTS
router.get('/', async (req, res, next) => {

  try {

    const { size, e, p } = req.query;
    const filter = {};

    if (e) {
      Object.assign(filter, {
        email: e
      })
    }

    if (p) {
      Object.assign(filter, {
        password: p
      })
    }

    const users = await service.find(size || 10, filter);
    if(e){
      const token = jwt.sign(e, process.env.AUTH_TOKEN_SECRET)
      res.json({
        'success': true,
        'message': 'Estos son los usuarios encontrados',
        'Data': users,
        'AccessToken': token
      });
    }else{
      res.json({
        'success': true,
        'message': 'Estos son los usuarios encontrados',
        'Data': users
      });
    }

    

  } catch (error) {
    next(error);
  }

});
//rutas especificas /:id
//GET PRODUCTS BY ID
router.get('/:id', ensureToken, validatorHandler(getValidUser, 'params'), async (req, res, next) => {

  try {

    const { id } = req.params;
    const user = await service.findOne(id);

    res.json({
      'success': true,
      'message': 'Este es el usuario encontrado',
      'Data': user
    });
  } catch (error) {
    next(error);
  }

});

//CREATE PRODUCTS
router.post('/', ensureToken, validatorHandler(createUserSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body;

    const { profilePic } = body;

    var name = null, path = null, extention = null;

    if (profilePic) {

      ({ name, path, extention } = profilePic);

      name = faker.datatype.uuid() + name + "." + extention;

      let buffer = new Buffer(path, 'base64')
      await blobService.createBlockBlobFromText(container, name, buffer, {
        contentType: extention
      }, async function (err) {
        if (err) {

          res.json({
            'success': false,
            'message': err
          });

        } else {

          const fileURL = `${MULTIMEDIAURL}${MULTIMEDIAPROFILEPICS}${name}`;

          body["profilePic"]["path"] = fileURL;
          const user = await service.create(body);

          res.json({
            'success': true,
            'message': "El usuario se ha creado con exito",
            'Data': user
          });

        }

      })
    } else {
      const user = await service.create(body);

      res.json({
        'success': true,
        'message': "El usuario se ha creado con exito",
        'Data': user
      });
    }
  } catch (error) {
    next(error);
  }

});

router.patch('/:id/addGame/', ensureToken, validatorHandler(getValidUser, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { gameID, ranked } = req.body;
    const user = await service.findOne(id);
    let userGames = [];
    if (user.favoriteGames.length !== 0) {
      user.favoriteGames.push({
        tiempoJugado: null,
        gameID: gameID,
        RANKED: ranked
      });


    } else {
      userGames[0] = {
        tiempoJugado: null,
        gameID: gameID,
        RANKED: ranked
      };
      user.favoriteGames = userGames;
    }

    const { old, changed } = await service.update(id, user);
    res.json({
      'success': true,
      'message': 'El  usuario ah sido editado',
      'Data': {
        "old": old,
        "new": changed
      }
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/removeGame/', ensureToken, validatorHandler(getValidUser, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { gameToRemove } = req.body;
    const user = await service.findOne(id);

    const games = user.favoriteGames;

    if (games) {
      let index = 0;
      let indexToDelete = 0;
      games.forEach(game => {
        if (game.gameID == gameToRemove)
          indexToDelete = index;
        index++;
      });

      games.splice(indexToDelete, 1);
    }

    const edit = {
      favoriteGames: games
    }

    const { old, changed } = await service.update(id, edit);

    res.json({
      'success': true,
      'message': 'El  usuario ah sido editado',
      'Data': {
        "old": old,
        "new": changed
      }
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/addFriend/', ensureToken, validatorHandler(getValidUser, 'params'), async (req, res, next) => {
  try {

    const { id } = req.params;
    const { userToFriend, date } = req.body;

    const user = await service.findOne(id);
    const user2 = await service.findOne(userToFriend);

    const friends = user.friends;
    const friends2 = user2.friends;

    const friend = {
      user: userToFriend,
      date: date
    }
    friends.push(friend);
    const edit = {
      friends: friends
    }

    const friend2 = {
      user: id,
      date: date
    }
    friends2.push(friend2);
    const edit2 = {
      friends: friends2
    }

    await service.update(userToFriend, edit2);
    const { old, changed } = await service.update(id, edit);
    res.json({
      'success': true,
      'message': 'El  usuario ah sido editado',
      'Data': {
        "old": old,
        "new": changed
      }
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/removeFriend/', ensureToken, validatorHandler(getValidUser, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userToUnfriend } = req.body;
    const user = await service.findOne(id);
    const user2 = await service.findOne(userToUnfriend);
    const friends = user.friends;
    const friends2 = user2.friends;


    if (friends) {
      let index = 0;
      let indexToDelete = 0;
      friends.forEach(friend => {
        if (friend.user == userToUnfriend)
          indexToDelete = index;
        index++;
      });

      friends.splice(indexToDelete, 1);
    }
    const edit = {
      friends: friends
    }

    if (friends2) {
      let index = 0;
      let indexToDelete = 0;
      friends2.forEach(friend => {
        if (friend.user == id)
          indexToDelete = index;
        index++;
      });

      friends2.splice(indexToDelete, 1);
    }
    const edit2 = {
      friends: friends2
    }



    const { old, changed } = await service.update(id, edit);
    await service.update(userToUnfriend, edit2);

    res.json({
      'success': true,
      'message': 'El  usuario ah sido editado',
      'Data': {
        "old": old,
        "new": changed
      }
    });
  } catch (error) {
    next(error);
  }
});


//PUT = TODOS LOS CAMPOS SE ACTUALIZAN
//PATCH =  ACTUALIZACION PARCIAL DE CAMPOS
//UPDATE
router.patch('/:id', ensureToken, validatorHandler(getValidUser, 'params'), validatorHandler(updateUserSchema, 'body'), async (req, res, next) => {

  try {
    const { id } = req.params;
    const data = req.body;
    const { old, changed } = await service.update(id, data);
    res.json({

      'success': true,
      'message': "Se ha actualizado el siguiente usuario",
      'Data': {
        "Original": old,
        "Modificado": changed
      }

    });
  } catch (error) {
    next(error);
  }

});

//DELETE
router.delete('/:id', ensureToken, validatorHandler(getValidUser, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.delete(id);
    res.json({
      'success': true,
      'message': "Se ha eliminado este usuario",
      'Data': {
        "message": "Usuario eliminado",
        "product": user
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;