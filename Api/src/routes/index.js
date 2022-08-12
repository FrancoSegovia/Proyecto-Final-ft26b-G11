const { Router } = require("express");

const ownerRoute = require("./owner");
const deliveryRoute = require("./delivery");
const usersRoute = require("./user");
const products = require("./products")

const router = Router();

router.use("/owner", ownerRoute);
router.use("/delivery", deliveryRoute);
router.use("/user", usersRoute);
router.use("/products", products)

module.exports = router;
