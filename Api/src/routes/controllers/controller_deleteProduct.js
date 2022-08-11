const Cart = require("../../schema/Cart");
const Product = require("../../schema/owner");
const mongoose = require("mongoose");

function getModelByName(name) {
    return mongoose.model(name);
  }

const deleteProduct = (req, res) => {
    const { productId} = req.params;

    // Buscamos el producto en el carrito
    const productInCart = Cart.findById(productId);

    const product = getModelByName("product")

    // Buscamos el producto en nuestra DB por el nombre en el que esta en el carrito
    const { name, image, price, _id } = product.findOne({
        name: productInCart.name,
    });

    // Buscamos y eliminamos el producto con la ID
    Cart.findByIdAndDelete(productId);

    Product.findByIdAndUpdate(
        _id,
        { inCart: false, name, image, price },
        { new: true }
    )
        .then((product) => {
            res.json({
                message: `The product ${product.name} was delete`
            });
        })
        .catch((error) => res.json({ message: "Error"}))
    
}

module.exports = deleteProduct;
