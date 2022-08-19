const express = require("express");
const controllers = require("./controllers/index")

const router = express.Router()

// RUTA GET PARA TRAER PRODUCTOS DE LA DB
// RUTA GET PARA TRAER LOS PRODUCTOS QUE ESTAN EN EL CARRITO

router.get("/user-cart/:id", controllers.getCart)
router.get("/products", controllers.getProduct )

// RUTA POST PARA AGREGAR PRODUCTOS AL CARRITO

router.put("/products-cart/:id", controllers.addProductCart)

// RUTA PUT PARA DISMINUIR O MODIFICAR LA CANTIDAD DE PRODUCTOS DEL CARRITO 

router.put("/products-cart/:_id", controllers.putProduct)

// RUTA DELETE PARA ELIMINAR PRODUCTOS DEL CARRITO

router.delete("/products-cart/:id", controllers.deleteProduct) 

// ELIMINAR TODO DEL CART

router.delete("/clear-cart/:id", controllers.deleteCart)

module.exports = router