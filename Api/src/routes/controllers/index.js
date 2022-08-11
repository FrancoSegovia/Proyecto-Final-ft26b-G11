const addProductCart = require("./controller_AddProductCart");
const deleteProduct = require("./controller_DeleteProduct");
const getProduct = require("./controller_GetProduct");
const getProductCart = require("./controller_GetProductsCart");
const putProduct = require("./controller_PutProduct");

module.exports = {
    addProductCart,
    deleteProduct,
    getProduct,
    getProductCart,
    putProduct
};