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
    const { idO } = req.body

    const item = getModelByName("Cart")
    
    const user = await User.findById(id)
    console.log(id)

    const order = await Order.findById(idO)
    console.log(idO)

    

    
    

    

    // const cart = await Order.findById()
    // console.log("soyProduct", product)
    // console.log(product)

    const cart = new Cart({
        user: id, 
        order: idO
    })


}



module.exports = addOrderToCart