const {addProductCart, getCart} = require("./controller_addProductCart");
const {deleteProduct, deleteCart} = require("./controller_deleteProduct");
// const putProduct = require("./controller_putProduct");

module.exports = {
    addProductCart,
    deleteProduct,
    // putProduct,
    deleteCart,
    getCart,
    // updateCart
    

};