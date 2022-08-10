const express = require("express");
const ownerController = require("../routes/controllers/controller_owners");
const router = express.Router();
const { isAuthenticated } = require("../routes/middlewares");

router.post("/signup", ownerController.signup);
router.get("/confirm/:token", ownerController.confirmAccount);
router.post("/login", ownerController.login);
router.post("/currentOwner",isAuthenticated, ownerController.currentOwner); //!DE LA FORMA QUE APLICO EL MIDDLEWARE isAuthenticated EN ESTA RUTA LO PUEDO HACER PARA EL RESTO DE LAS RUTAS DE MANERA INDIVIDUAL

//?-----------------------------------------
router.post("/", ownerController.post);

module.exports = router;
