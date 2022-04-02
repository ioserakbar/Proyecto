//const faker = require('faker');
const boom = require('@hapi/boom');
const ChatRoomModel = require('../Models/chatroom.model');

const errNotFound = "No se logró encontrar lo buscado";
const errEmpty = "Aún no hay cuentas creadas";


class ChatroomService{

  

  //FIND ALL INFO
  async find(limit, filter){
    
    let chatrooms = await ChatRoomModel.find(filter);
    
    if(chatrooms == undefined || chatrooms == null)
      throw boom.notFound(errNotFound);
    if(chatrooms.length <= 0 )
      throw boom.notFound(errEmpty);

    chatrooms = chatrooms.filter((item, index) => item && index < limit);
    
    return chatrooms;

  }

  //CREATE INFO
  async create(data){

    const newChatRoom = new ChatRoomModel(data);
    await newChatRoom.save(); 
    return data;
  }

  //FIND SPECIFIC ACCOUNT
  async findOne(id){
    const chatroom = await ChatRoomModel.findOne({
      _id:id
    })

    if(chatroom == undefined || chatroom == null)
      throw boom.notFound(errNotFound);
    if(chatroom.length <= 0 )
      throw boom.notFound(errEmpty);

    return chatroom;

  }

  //EDIT SPECIFIC ACCOUNT
  async update(id, changes){
    
    let chatroom = await ChatRoomModel.findOne({
      _id:id
    });

    if(chatroom == undefined || chatroom == null)
      throw boom.notFound(errNotFound);
    if(chatroom.length <= 0 )
      throw boom.notFound(errEmpty);

    let originalChatrrom = {
      userOne:chatroom.userOne,
      userTwo:chatroom.userTwo,
    };

    const {userOne, userTwo} = changes;

    if(userOne)
      chatroom.userOne = userOne
    if(userTwo)
      chatroom.userTwo = userTwo

    await chatroom.save();
    return {
      old : originalChatrrom, 
      changed: chatroom
    };
  }

  async delete(id){
    let chatroom = await ChatRoomModel.findOne({
      _id:id
    });

    const { deletedCount } = await ChatRoomModel.deleteOne({
      _id:id
    });

    if(deletedCount <= 0 )
      throw boom.notFound(errEmpty);
    
    return chatroom;
  }
   
}

module.exports = ChatroomService;