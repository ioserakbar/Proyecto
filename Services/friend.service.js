const boom = require('@hapi/boom');
const FriendModel = require('../Models/friend.model');

const errNotFound = "No se logró encontrar lo buscado";
const errEmpty = "Aún no hay cuentas creadas";
class FriendService{

  //FIND ALL INFO
  async find(limit, filter){

    let friends = await FriendModel.find(filter);
    

    if(friends == undefined || friends == null)
      throw boom.notFound(errNotFound);
    else if (friends.length <= 0 )
      throw boom.notFound(errEmpty);

    friends = friends.filter((item, index) => item && index < limit);
    return friends;

  }

  //CREATE INFO
  async create(data){
    const newFriend = new FriendModel(data);
    await newFriend.save(); 
    return data;
  }

  //FIND SPECIFIC ACCOUNT
  async findOne(id){

    const friend = await FriendModel.findOne({
      _id:id
    })

    if(friend == undefined || friend == null)
      throw boom.notFound(errNotFound);
    else if (friend.length <= 0 )
      throw boom.notFound(errEmpty);

    return friend;

  }

  //EDIT SPECIFIC ACCOUNT
  async update(id, changes){

    let friend = await FriendModel.findOne({
      _id:id
    });
    
    if(friend == undefined || friend == null)
      throw boom.notFound(errNotFound);
    if(friend.length <= 0 )
      throw boom.notFound(errEmpty);

    let originalFriend = {
      userOne:friend.userOne,
      userTwo:friend.userTwo,
      date:friend.date
    };

    const {userOne, userTwo, date} = changes;

    if(userOne)
      friend.userOne = userOne
    if(userTwo)
      friend.userTwo = userTwo
    if(date)
      friend.date = date

    await friend.save();
    
    return {
      old : originalFriend, 
      changed: friend
    };
  }

  async delete(id){
    
    let friend = await FriendModel.findOne({
      _id:id
    });

    const { deletedCount } = await FriendModel.deleteOne({
      _id:id
    });

    if(deletedCount <= 0 )
      throw boom.notFound(errEmpty);
    
    return friend;
  }
   
}

module.exports = FriendService;