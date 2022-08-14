const product = require("../../schema/Product");
const mongoose = require("mongoose")


function getModelByName(name) {
    return mongoose.model(name);
  }


const getProducts = (req, res) => {
    const { name } = req.query;
    const products = getModelByName("Product")
    if (name) {
    
      products
          .find({ name: new RegExp(req.query.name.toLowerCase(), "i") })
          .then((data) => res.json(data))
          .catch((error) => res.json({ message: error }));
        } else {
        products
            .find()
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error }));
  }
}

module.exports = getProducts;