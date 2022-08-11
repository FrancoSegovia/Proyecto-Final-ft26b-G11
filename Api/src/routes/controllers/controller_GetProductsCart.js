const Cart = require("../../schema/Carts");

const getProductsCart = async (req, res) => {
    const productsCart = await Cart.find();

    if(productsCart) {
        res.json({ productsCart})
    } else {
        res.json({ message: "There is not product in Cart"})
    }
}

module.exports = getProductsCart