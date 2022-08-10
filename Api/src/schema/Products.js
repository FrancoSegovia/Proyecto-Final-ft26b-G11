const products = require("./owner")
const mongoose = require("mongoose")


function getModelByName(name) {
    return mongoose.model(name);
  }



module.exports = mongoose.model("Product", getModelByName)