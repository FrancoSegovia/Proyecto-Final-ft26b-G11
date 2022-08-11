const Product = require("../../schema/Products")

const getProducts = async (req, res) => {
    const products = await Product.find();

    if(products) {
        res.json({products});
    }else {
        res.json({ message: "There isn't products"})
    }
}

module.exports = getProducts;