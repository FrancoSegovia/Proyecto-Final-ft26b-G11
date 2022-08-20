// const Cart = require("../../schema/Cart");
const Product = require("../../schema/Product");
const User = require("../../schema/User");
const mongoose = require("mongoose");

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

    const userResponse = await User.findById(id);
    const cart = userResponse.cart;

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
  }
};

const getCart = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    const cart = user.cart;

    res.json(cart);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addProductCart,
  getCart,
};

//   const product = getModelByName("Product")

//     // Nos fijamos si tenemos el producto

//     // Nos fijamos si todos los campos vienen con info

//     const isNotEmptyCart = name !== "" && image !== "" && price !== "" ;

//     // Nos fijamos si el producto esta en el carrito

//     const inCart = await Cart.findOne({name});

//     // Si no tenemos el producto

//     if(!productExist){
//         res.status(400).json({
//             message: "This product is not in our database "
//         })

//     // Si nos envian algo y NO esta en el carrito lo agregamos
//     } else if (isNotEmptyCart && !inCart){
//         const newProductInCart = new Cart({ name, image, price, amount: 1, user});

//     // Actualizamos la prop inCart
//         product.findByIdAndUpdate(productExist?._id, { inCart: true, name, image, price}, { new: true} )
//         const newProduct = await newProductInCart.save();
//         res.json(newProduct)

//     }else  {
//         res.status(400).json({
//             message: "The product is in Cart"
//         })

//     }
// }

// module.exports = addProductCart
