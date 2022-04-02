const boom = require('@hapi/boom');

const LinkedAccountModel = require("../Models/linkedaccount.model")
const errNotFound = "No se logró encontrar lo buscado";
const errEmpty = "Aún no hay cuentas creadas";
class LinkedAccountService{

  //FIND ALL INFO
  async find(limit, filter){

    let linkedAccounts = await LinkedAccountModel.find(filter);
    

    if(linkedAccounts == undefined || linkedAccounts == null)
      throw boom.notFound(errNotFound);
    else if (linkedAccounts.length <= 0 )
      throw boom.notFound(errEmpty);

    linkedAccounts = linkedAccounts.filter((item, index) => item && index < limit);
    return linkedAccounts;

  }

  //CREATE INFO
  async create(data){
    const newLinkedAccounts = new LinkedAccountModel(data);
    await newLinkedAccounts.save(); 
    return data;
  }

  //FIND SPECIFIC ACCOUNT
  async findOne(id){

    const linkedAccount = await LinkedAccountModel.findOne({
      _id:id
    })

    if(linkedAccount == undefined || linkedAccount == null)
      throw boom.notFound(errNotFound);
    else if (linkedAccount.length <= 0 )
      throw boom.notFound(errEmpty);

    return linkedAccount;

  }

  //EDIT SPECIFIC ACCOUNT
  async update(id, changes){

    let linkedAccount = await LinkedAccountModel.findOne({
      _id:id
    });
    
    if(linkedAccount == undefined || linkedAccount == null)
      throw boom.notFound(errNotFound);
    if(linkedAccount.length <= 0 )
      throw boom.notFound(errEmpty);

    let originalLinkedAccount = {
      userID:linkedAccount.userID,
      email:linkedAccount.email,
      type:linkedAccount.type
    };

    const {userID, email, type} = changes;

    if(userID)
      linkedAccount.userID = userID
    if(email)
      linkedAccount.email = email
    if(type)
      linkedAccount.type = type

    await linkedAccount.save();
    
    return {
      old : originalLinkedAccount, 
      changed: linkedAccount
    };
  }

  async delete(id){
    
    let linkedAccount = await LinkedAccountModel.findOne({
      _id:id
    });

    const { deletedCount } = await LinkedAccountModel.deleteOne({
      _id:id
    });

    if(deletedCount <= 0 )
      throw boom.notFound(errEmpty);
    
    return linkedAccount;
  }
   
}

module.exports = LinkedAccountService;