const { Router } = require("express");

const ownerRoute = require("./owner");
const deliveryRoute = require("./delivery");
const usersRoute = require("./user");

const router = Router();

router.use("/owner", ownerRoute);
router.use("/delivery", deliveryRoute);
router.use("/user", usersRoute);

module.exports = router;
