const cartSchema = require("../../schema/Cart")
const mongoose = require("mongoose");

// function getModelByName(name) {
//     return mongoose.model(name);
//   }

const getProductsCart = (req, res) => {
   const productInCart = cartSchema.find();
   

    if(productInCart) {
        productInCart
        .then((data) => res.json({ data }) )
        .catch((error) => res.json({ message: error }));
    } else {
        res.json({ message: "There is not product in Cart"})
    }
}

const getCart = (req, res) => {
    const { id } = req.params
    const userCart = cartSchema.findById(id)

    if(userCart){
        userCart
        .then((data) => res.json ({data}))
        .catch((error) => res.json({ message: error}))
    } else {
        res.json ({message: "Cart not found"})
    }
}

module.exports = getProductsCart