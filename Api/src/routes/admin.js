const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../routes/middlewares");
const adminController = require("../routes/controllers/controller_admin");
const ownerController = require("../routes/controllers/controller_owners");
const deliveryController = require("../routes/controllers/controller_deliverys");
const userController = require("./controllers/controller_users");

router.post("/login", userController.login); //*LOGUEO

router.get("/local", isAuthenticated, ownerController.getLocal); //* GET ALL LOCALS
router.get("/local/detail/:id", isAuthenticated, ownerController.getLocalById); //*DETAIL LOCAL
router.get("/users", isAuthenticated, userController.get); //*GET ALL USERS Y BY NAME
router.get("/owner", isAuthenticated, adminController.getOwner); //* GET ALL OWNERS Y BY NAME
router.get("/delivery", isAuthenticated, adminController.getDelivery); //* *GET ALL DELIVERYS Y BY NAME
router.delete("/local/:id", isAuthenticated, adminController.deleteLocal); //*DELETE LOCAL
router.delete("/users/:id", adminController.deleteUser); //*DELETE USER
router.delete("/owner/:id", isAuthenticated, adminController.deleteOwner); //*DELETE OWNER
router.delete("/delivery/:id", isAuthenticated, adminController.deleteDelivery); //*DELETE DELIVERY

module.exports = router;
