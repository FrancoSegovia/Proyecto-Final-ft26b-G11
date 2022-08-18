const User = require("../../schema/User");
const Product = require("../../schema/Product");
const mongoose = require("mongoose");

function getModelByName(name) {
    return mongoose.model(name);
  }

const deleteProduct = (req, res) => {
    const { idP } = req.body;
    const { id } = req.params;
  
     User
      .remove({_id: idP})
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  }

module.exports = deleteProduct;
