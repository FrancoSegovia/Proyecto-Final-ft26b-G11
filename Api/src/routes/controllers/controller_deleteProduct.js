const User = require("../../schema/User");
const Product = require("../../schema/Product");
const mongoose = require("mongoose");

function getModelByName(name) {
    return mongoose.model(name);
  }

const deleteProduct = async (req, res) => {
    const { idP } = req.body;  // order
    const { id } = req.params; // user


  const user = await User.update( 
      { "_id" : id} , 
      { "$pull" : { "cart" : { "product" :  idP } } } , 
      { "multi" : true }  
  )
  res.json(user)
}
const deleteCart = async (req, res) => {
  const { id } = req.params
  const user = await User.update( 
    { "_id" : id} , 
    { "$set" : { "cart" : [] }  } , 
    { "multi" : true }  
  )
  res.json(user)
}

const updateCart = async (req, res) => {
    const { id } = req.params
 
     User.update(
    {name: 'Koka'}, 
    {'address.street': 'new street name'},
    )
}





  
    // const user = await User.findOne({ _id: id })
    // console.log("soy user", user.cart)
    //   await user.cart.pull({ product: idP });
    //   await user.save();
  
    // const event = await User.findOneAndUpdate({ _id: id }, { $pull: { cart: [{product: idP}] } }, { new: true });
    // const deleteProduct =  await User.updateOne({_id: id}, {
    //   $pullAll: {
    //     cart: [{product: idP}]
    //   }
     //de esta forma busca un usuario y lo elimina, yo necesito que me elimine el producto
      
  

module.exports = {
  deleteProduct,
  deleteCart
}
