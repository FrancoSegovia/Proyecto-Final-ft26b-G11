const express = require("express");
const { isAuthenticated } = require("../routes/middlewares");
const deliveryController = require("../routes/controllers/controller_deliverys") 
const router = express.Router();

router.post("/signup", deliveryController.signup); //*REGISTRO
router.get("/confirm/:token", deliveryController.confirmAccount); //*EMAIL Y VERIFICACION

router.get("/currentDelivery/:id", isAuthenticated, deliveryController.currentDelivery); //*DETAIL DELIVERY
router.put("/currentDelivery/update/:id",isAuthenticated, deliveryController.updatecurrentDelivery); //* UPDATE DELIVERY
router.get("/destination", isAuthenticated, deliveryController.getDirection); //* TRAE TODAS ORDENES
router.put("/destination/state/:id", isAuthenticated, deliveryController.updateState) //* MODIFICADO ESTADO Y LE PERMITE AL DELIVERY SELECCIONARLO
router.delete("/destination/received/:id", isAuthenticated, deliveryController.deleteOrder) //* BORRA LA ORDEN UNA VEZ ENTREGADA
router.get("/destination/orders/:id", isAuthenticated, deliveryController.getUserOrders); //* TTRAE ORDENES POR USUARIO


module.exports = router;