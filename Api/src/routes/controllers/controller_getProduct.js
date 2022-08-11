const product = require("../../schema/owner");
const mongoose = require("mongoose")


function getModelByName(name) {
    return mongoose.model(name);
  }


const getProducts = (req, res) => {
    const products = getModelByName("product");
    
    const Products = products.find()

    if(Products) {
        res.json({Products});
    }else {
        res.json({ message: "There isn't products"})
    }
}

module.exports = getProducts;