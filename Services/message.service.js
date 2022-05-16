const boom = require('@hapi/boom');

const MessageModel = require("../Models/message.model")
const errNotFound = "No se logró encontrar lo buscado";
const errEmpty = "Aún no hay cuentas creadas";
class MessageService {

  //FIND ALL INFO
  async find(limit, filter) {

    let messages = await MessageModel.find(filter);


    if (messages == undefined || messages == null)
      throw boom.notFound(errNotFound);

    if (limit)
      messages = messages.filter((item, index) => item && index < limit);
    return messages;

  }

  //CREATE INFO
  async create(data) {
    const newMessage = new MessageModel(data);
    await newMessage.save();
    return data;
  }

  //FIND SPECIFIC ACCOUNT
  async findOne(id) {

    const message = await MessageModel.findOne({
      _id: id
    })

    if (message == undefined || message == null)
      throw boom.notFound(errNotFound);
    else if (message.length <= 0)
      throw boom.notFound(errEmpty);

    return message;

  }

  //EDIT SPECIFIC ACCOUNT
  async update(id, changes) {

    let message = await MessageModel.findOne({
      _id: id
    });

    if (message == undefined || message == null)
      throw boom.notFound(errNotFound);
    if (message.length <= 0)
      throw boom.notFound(errEmpty);

    let originalMessage = {
      content: message.content,
      multimediaID: message.multimediaID,
      date: message.date,
      userSenderID: message.userSenderID,
      chatRoomID: message.chatRoomID,
      seen: message.seen
    };

    const { content, multimediaID, date,  userSenderID, chatRoomID, seen } = changes;

    if (content)
      message.content = content
    if (multimediaID)
      message.multimediaID = multimediaID
    if (date)
      message.date = date
    if (userSenderID)
      message.userSenderID = userSenderID
    if (chatRoomID)
      message.chatRoomID = chatRoomID
    if (seen)
      message.seen = seen;

    await message.save();

    return {
      old: originalMessage,
      changed: message
    };
  }

  async delete(id) {

    let message = await MessageModel.findOne({
      _id: id
    });

    const { deletedCount } = await MessageModel.deleteOne({
      _id: id
    });

    if (deletedCount <= 0)
      throw boom.notFound(errEmpty);

    return message;
  }


}

module.exports = MessageService;