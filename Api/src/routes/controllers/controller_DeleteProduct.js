const Cart = require("../../schema/Carts");
const Product = require("../../schema/Products");

const deleteProduct = async (req, res) => {
    const { productId} = req.params;

    const productInCart = await Cart.findById(productId);

    const { name, image, price, _id } = await Product.findOne({
        name: productInCart.name,
    });

    await Cart.findByIdAndDelete(productId);

    await Product.findByIdAndUpdate(
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