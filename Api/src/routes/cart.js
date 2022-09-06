const express = require("express");
const controllers = require("./controllers/index");
const router = express.Router();

router.get("/user-cart/:id", controllers.getCart); // TRAER LOS PRODUCTOS QUE ESTAN EN EL CARRITO

router.put("/products-cart/:id", controllers.addProductCart); // AGREGAR PRODUCTO AL CARRITO

router.put("/products-amount/:id", controllers.cartAmount); // AUMENTAR O DISMINUIR LA CANTIDAD DEL PRODUCTO

router.delete("/products-cart/:id", controllers.deleteProduct); // ELIMINAR UN PRODUCTO DEL CARRITO 

router.delete("/clear-cart/:id", controllers.deleteCart); // ELIMINAR TODO DEL CARRRITO

module.exports = router;
