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

// const updateCart = async (req, res) => {
//     const { query } = req.query
//     const { idP } = req.body
//     const { id } = req.params
//   if(query === "add"){

//   const user = await User.update(
//     {"_id": id},
//     {"cart": {"product": idP, 'amount': + 2} }, 
//     { "multi" : true }  
//     ) 
//     res.json(user)
//   }
// }




module.exports = {
  deleteProduct,
  deleteCart,
  // updateCart
}
