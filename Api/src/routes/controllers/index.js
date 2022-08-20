const {addProductCart, getCart} = require("./controller_addProductCart");
const {deleteProduct, deleteCart} = require("./controller_deleteProduct");

const getProduct = require("./controller_getProduct");
const getProductCart = require("./controller_getProductCart");
const putProduct = require("./controller_putProduct");

module.exports = {
    addProductCart,
    deleteProduct,
    getProduct,
    getProductCart,
    putProduct,
    deleteCart,
    getCart,
    // updateCart

};