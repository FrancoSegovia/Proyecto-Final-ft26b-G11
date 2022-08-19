const express = require("express");
const userController = require("./controllers/controller_users");
const ownerController = require("../routes/controllers/controller_owners");
const { isAuthenticated } = require("../routes/middlewares");
const router = express.Router();

router.post("/signup", userController.signup); //*REGISTRO
router.get("/confirm/:token", userController.confirmAccount); //*EMAIL Y VERIFICACION

router.get("/currentUser/:id", isAuthenticated, userController.currentUser); //*DETAIL USER
router.put("/currentUser/update/:id",isAuthenticated, userController.updateCurrentUser); //* UPDATE USER

router.get("/local", userController.getLocal);//* GET ALL LOCALS Y BY NAME CON SUS PRODUCTOS POPULATE
// router.get("/local/products/:id", ownerController.getProduct);//? GET PRODUCT SEPARADOS POR LOCAL ¿HCE FALTA AHORA?

router.get("/local/products", userController.getProductSearch)
module.exports = router;
