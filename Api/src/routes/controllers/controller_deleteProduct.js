const User = require("../../schema/User");
const Product = require("../../schema/Product");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const deleteProduct = async (req, res) => {
  try {
    const { idP } = req.body;
    const { id } = req.params;

    await User.update(
      { _id: id },
      { $pull: { cart: { product: idP } } },
      { multi: true }
    );

    const { cart } = await User.findById(id).lean();

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

    const formattedProducts = userResponse[0].products.map((p) => {
      const cartItem = cart.find(
        ({ product }) => product.toString() === p._id.toString()
      );

      return { ...p, amount: cartItem?.amount };
    });

    res.status(200).json(formattedProducts);
  } catch (error) {
    res.status(404).json(error);
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
    res.status(404).json(error);
  }
};

module.exports = {
  deleteProduct,
  deleteCart,
};
