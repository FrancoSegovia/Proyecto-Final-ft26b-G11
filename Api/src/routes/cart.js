const express = require("express");
const controllers = require("./controllers/index")

const router = express.Router()

// RUTA GET PARA TRAER PRODUCTOS DE LA DB
// RUTA GET PARA TRAER LOS PRODUCTOS QUE ESTAN EN EL CARRITO

router.delete("/products-cart/:productId", controllers.deleteProduct)
router.get("/products", controllers.getProduct )
router.get("/products-cart", controllers.getProductCart)

// RUTA POST PARA AGREGAR PRODUCTOS AL CARRITO

router.post("/products-cart/", controllers.addProductCart)

// RUTA PUT PARA DISMINUIR O MODIFICAR LA CANTIDAD DE PRODUCTOS DEL CARRITO

router.put("/products-cart/:_id", controllers.putProduct)

// RUTA DELETE PARA ELIMINAR PRODUCTOS DEL CARRITO


module.exports = router