const express = require("express");
const { isAuthenticated } = require("../routes/middlewares");
const deliveryController = require("../routes/controllers/controller_deliverys") 
const userController = require("../routes/controllers/controller_users") 
const router = express.Router();

router.post("/signup", deliveryController.signup); //*REGISTRO
router.get("/confirm/:token", deliveryController.confirmAccount); //*EMAIL Y VERIFICACION

router.get("/currentDelivery/:id", isAuthenticated, deliveryController.currentDelivery); //*DETAIL DELIVERY
router.put("/currentDelivery/update/:id",isAuthenticated, deliveryController.updatecurrentDelivery); //* UPDATE DELIVERY

module.exports = router;