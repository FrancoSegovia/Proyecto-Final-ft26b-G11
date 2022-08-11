const cartSchema = require("../../schema/Cart")
const mongoose = require("mongoose");

// function getModelByName(name) {
//     return mongoose.model(name);
//   }

const getProductsCart = (req, res) => {
   const productInCart = cartSchema.find();


    if(productInCart) {
        res.json({ productInCart })
    } else {
        res.json({ message: "There is not product in Cart"})
    }
}

module.exports = getProductsCart