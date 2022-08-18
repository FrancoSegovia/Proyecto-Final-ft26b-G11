const { Router } = require("express");

const ownerRoute = require("./owner");
const deliveryRoute = require("./delivery");
const usersRoute = require("./user");
const adminRoute = require("./admin");
const cart = require("./cart")
const userController = require("../routes/controllers/controller_users")
const pay = require("./paymentIntents")

const router = Router();

router.use("/owner", ownerRoute);
router.use("/delivery", deliveryRoute);
router.use("/user", usersRoute);
router.use("/admin", adminRoute);
router.use("/cart", cart)
router.use("/login", ownerRoute,deliveryRoute,usersRoute, userController.login) //*LOGIN GENERAL
router.use("/pay", pay)


module.exports = router;
