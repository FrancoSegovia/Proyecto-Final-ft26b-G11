const User = require("../../schema/User");
const Product = require("../../schema/Product");
const mongoose = require("mongoose");

function getModelByName(name) {
    return mongoose.model(name);
  }

const deleteProduct = async (req, res) => {
    const { idP } = req.body;  // order
    const { id } = req.params; // user
  
    const deleteProduct =  await User.deleteOne({_id: id}) //de esta forma busca un usuario y lo elimina, yo necesito que me elimine el producto
      res.json(deleteProduct)
  }
  // User.findByIdAndUpdate({_id: id}, {$push: {cart: {product}}})

module.exports = deleteProduct;
