// const Cart = require("../../schema/Cart");
const Product = require("../../schema/Product");
const User = require("../../schema/User");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

function getModelByName(name) {
  return mongoose.model(name);
}

const addProductCart = async (req, res) => {
  try {
    const { id } = req.params; // USER ID
    const { _id } = req.body; // PRODUCT ID

    const product = await Product.findById({ _id });

    const user = await User.update(
      { _id: id },
      { $push: { cart: { product: _id } } },
      { multi: true }
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
        $replaceRoot: {
          newRoot: "$cart",
        },
      },
    ]);

    res.status(200).json(userResponse);
  } catch (error) {
    console.error(error);
  }
};

const getCart = async (req, res) => {
  try {
    const { id } = req.params; // user

    const user = await User.aggregate([
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
        $replaceRoot: {
          newRoot: "$cart",
        },
      },
    ]);

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addProductCart,
  getCart,
};
