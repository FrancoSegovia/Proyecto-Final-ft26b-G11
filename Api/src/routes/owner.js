const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../routes/middlewares");
const ownerController = require("../routes/controllers/controller_owners");

router.post("/signup", ownerController.signup); //!REGISTRO
router.get("/confirm/:token", ownerController.confirmAccount); //!TOKEN
router.post("/login", ownerController.login); //!LOGUEO
 //!DE LA FORMA QUE APLICO EL MIDDLEWARE isAuthenticated EN ESTA RUTA LO PUEDO HACER PARA EL RESTO DE LAS RUTAS DE MANERA INDIVIDUAL
//!ESTA ULTIMA RUTA ESTA PROTEGIDA, DEVUELVE TODOS LOS DATOS DEL SIGNUP
//! NO SIRVE PARA NADA ESTA RUTA CREO, SOLO PARA VERIFICAR QUE ES UNA RUTA PROTEGIDA Y MOSTRAR UN PAR DE DATOS
//?-----------------------------------------
router.get("/currentOwner", isAuthenticated, ownerController.currentOwner);
router.get("/", isAuthenticated, ownerController.getLocal);
router.get("/:id", isAuthenticated, ownerController.getLocalById);
router.post("/add_local", isAuthenticated, ownerController.addLocal);
router.post("/add_local/add_product",isAuthenticated,ownerController.addProduct);
// router.delete('/:id', isAuthenticated, ownerController.deleteLocal)

module.exports = router;
