const Order = require("../../schema/Order");
const Cart = require("../../schema/Cart")
const Product = require("../../schema/Product");
const User = require("../../schema/User")
const newOrder = require("./controller_addProductCart");
const mongoose = require("mongoose");

function getModelByName(name) {
    return mongoose.model(name);
  }
  
  
const addOrderToCart = async (req, res) => {

    const { id } = req.params

    const user = User.findById(id)
    console.log(id)

    


}



module.exports = addOrderToCart