const User = require("../../schema/User");
const Product = require("../../schema/Product");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

function getModelByName(name) {
  return mongoose.model(name);
}

const deleteProduct = async (req, res) => {

  try {
    const { idP } = req.body;
    const { id } = req.params;

    await User.update(
      { _id: id },
      { $pull: { cart: { product: idP } } },
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

const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.update(
      { _id: id },
      { $set: { cart: [] } },
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

// const updateCart = async (req, res) => {
//   const { idP } = req.body;
//   const { id } = req.params;

//   const user = await User.update(
//     { _id: id },
//     { cart: { product: idP, amount: +5 } },
//     { multi: true }
//   );
//   res.json(user);
// };

module.exports = {
  deleteProduct,
  deleteCart,
  // updateCart
};
