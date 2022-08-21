const User = require("../../schema/User");
const Product = require("../../schema/Product");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

function getModelByName(name) {
  return mongoose.model(name);
}

const deleteProduct = async (req, res) => {

  const { idP } = req.body; // PRODUCT ID
  const { id } = req.params; // USER ID

  
console.log("estoy en el delete")

console.log(idP + "----------")
  console.log(id + "¡¡¡¡¡¡¡¡¡¡¡¡")

  const user = await User.update(
    { "_id": id },
    { "$pull": { "cart": { "product": idP } } },
    { "multi": true }
  );

  const userResponse = await User.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "cart.product",
        foreignField: "_id",
        as: "cart.products",
      },
    },
    {
      $match: {
        _id: ObjectId(id),
      },
    },
    {
      "$replaceRoot": {
        "newRoot": "$cart",
      },
    },
  ]);
  console.log(userResponse);
  res.json(userResponse);
};

const deleteCart = async (req, res) => {
  const { id } = req.params; // USER ID
  const user = await User.update(
    { _id: id },
    { $set: { cart: [] } },
    { multi: true }
  );
  res.json(user);
};

const updateCart = async (req, res) => {
  // const { query } = req.query
  const { idP } = req.body;
  const { id } = req.params;
  // if(query === "add"){

  const user = await User.update(
    { _id: id },
    { cart: { product: idP, amount: +5 } },
    { multi: true }
  );
  res.json(user);
};

module.exports = {
  deleteProduct,
  deleteCart,
  // updateCart
};
