const Product = require("../../schema/Product");
const User = require("../../schema/User");
const mongoose = require("mongoose");
const { use } = require("../cart");
const ObjectId = mongoose.Types.ObjectId;

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

const getCart = async (req, res) => {
  try {
    const { id } = req.params; // user

    const { cart } = await User.findById(id).lean();

    const userProduct = await User.aggregate([
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

    const formattedProducts = userProduct[0].products.map((p) => {
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

const cartAmount = async (req, res) => {
  const { _id, amount } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { "cart.$[el].amount": amount } },
      {
        arrayFilters: [{ "el.product": _id }],
        new: true,
      }
    );
 
    const { cart } = await User.findById(req.params.id).lean();

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
          _id: ObjectId(req.params.id),
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
    console.log(error);
  }
};

module.exports = {
  addProductCart,
  getCart,
  cartAmount,
};
