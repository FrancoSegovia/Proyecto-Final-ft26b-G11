const express = require("express");
const userController = require("./controllers/controller_users");
const ownerController = require("../routes/controllers/controller_owners");
const { isAuthenticated } = require("../routes/middlewares");
const router = express.Router();

router.post("/signup", userController.signup); //*REGISTRO
router.get("/confirm/:token", userController.confirmAccount); //*EMAIL Y VERIFICACION
router.post("/login", userController.login); //*LOGUEO

router.get("/currentUser", isAuthenticated, userController.currentUser); //*DETAIL USER
router.put("/currentUser/update/:id",isAuthenticated,userController.updateCurrentUser); //? UPDATE USER PERO ME SACA EL HASH

router.get("/local", ownerController.getLocal);//* GET ALL LOCALS
router.get("/local/products", ownerController.getProduct);//? GET PRODUCT PERO TODOS, NO SEPARADOS POR LOCAL

//!FALTA SEARCH PARA BUSCAR LOCALES

module.exports = router;
