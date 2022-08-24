const {addProductCart, getCart, cartAmount} = require("./controller_addProductCart");
const {deleteProduct, deleteCart} = require("./controller_deleteProduct");


module.exports = {
    addProductCart,
    deleteProduct,
    deleteCart,
    getCart,
    cartAmount
};