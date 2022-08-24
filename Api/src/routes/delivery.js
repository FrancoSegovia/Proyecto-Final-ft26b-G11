const express = require("express");
const { isAuthenticated } = require("../routes/middlewares");
const deliveryController = require("../routes/controllers/controller_deliverys") 
const router = express.Router();

router.post("/signup", deliveryController.signup); //*REGISTRO
router.get("/confirm/:token", deliveryController.confirmAccount); //*EMAIL Y VERIFICACION

router.get("/currentDelivery/:id", isAuthenticated, deliveryController.currentDelivery); //*DETAIL DELIVERY
router.put("/currentDelivery/update/:id",isAuthenticated, deliveryController.updatecurrentDelivery); //* UPDATE DELIVERY

router.get("/destination", isAuthenticated, deliveryController.getDirection); //* TRAE ORDENES
router.put("/destination/state", isAuthenticated, deliveryController.updateState) //* MODIFICADO ESTADO Y LE PERMITE AL DELIVERY SELECCIONARLO
router.delete("/destination/received/:idD", isAuthenticated, deliveryController.deleteOrder) //* BORRA LA ORDEN UNA VEZ ENTREGADA
router.get("/destination/orders/:id", isAuthenticated, deliveryController.getUserOrders); //* TTRAE ORDENES POR USUARIO
router.get("/destination/:id", isAuthenticated, deliveryController.getDeliveryOrders); //* TRAE DATOS DEL DELIVERY



module.exports = router;