const cartSchema = require("../../schema/Cart")
const userSchema = require("../../schema/User")
const mongoose = require("mongoose");

// function getModelByName(name) {
//     return mongoose.model(name);
//   }

const getProductsCart = async (req, res) => {
    const { id } = req.params
    // const productInCart = cartSchema.find();
    const getUserId = await userSchema.findById(id)

    cartSchema.find({user: getUserId})
    .then((data) => res.json(data))
    .catch((error) => res.status(200).send({ message: error }));
   

//     if(productInCart) {
//         productInCart
//         .then((data) => res.json({ data }) )
//         .catch((error) => res.json({ message: error }));
//     } else {
//         res.json({ message: "There is not product in Cart"})
//     }
    }

// const getLocal = async (req, res) => {
//     const { id } = req.params;
//   const ownerId = await ownerSchema.findById(id)
//     localSchema.find({owner: ownerId})
//         .then((data) => res.json(data))
//         .catch((error) => res.status(200).send({ message: error }));

module.exports = getProductsCart