const newCart = require("./controller_addOrderToCart")
const deleteProduct = require("./controller_deleteProduct");
const getProduct = require("./controller_getProduct");
const getProductCart = require("./controller_getProductCart");
const putProduct = require("./controller_putProduct");

module.exports = {
    newCart,
    deleteProduct,
    getProduct,
    getProductCart,
    putProduct
};