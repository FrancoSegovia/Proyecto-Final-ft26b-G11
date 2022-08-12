const { Router } = require("express");

const ownerRoute = require("./owner");
const deliveryRoute = require("./delivery");
const usersRoute = require("./user");
const adminRoute = require("./admin");

const router = Router();

router.use("/owner", ownerRoute);
router.use("/delivery", deliveryRoute);
router.use("/user", usersRoute);
router.use("/admin", adminRoute);

module.exports = router;
