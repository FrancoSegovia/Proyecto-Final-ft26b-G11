const Cart = require("../../schema/Cart");
const Product = require("../../schema/Product");
const mongoose = require("mongoose");

function getModelByName(name) {
    return mongoose.model(name);
  }

const deleteProduct = (req, res) => {
    const { productId } = req.params;

    Cart
      .remove({ _id: productId })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  }

module.exports = deleteProduct;
