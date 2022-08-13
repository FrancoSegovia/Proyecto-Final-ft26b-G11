const express = require("express");
const { isAuthenticated } = require("../routes/middlewares");
const deliveryController = require("../routes/controllers/controller_deliverys") 
const router = express.Router();

router.post("/signup", deliveryController.signup); //!REGISTRO VER NODEMAILER
router.get("/confirm/:token", deliveryController.confirmAccount); //*EMAIL Y VERIFICACION
router.post("/login", deliveryController.login); //*LOGUEO

router.get("/currentDelivery", isAuthenticated, deliveryController.currentDelivery); //*DETAIL DELIVERY
router.put("/currentDelivery/update/:id",isAuthenticated, deliveryController.updatecurrentDelivery); //* UPDATE DELIVERY

module.exports = router;