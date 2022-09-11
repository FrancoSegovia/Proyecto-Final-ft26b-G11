const { Router } = require('express');

const ownerRoute = require('./owner')
const deliveryRoute = require('./delivery')
const usersRoute = require('./users')
const local = require("./local")

const router = Router();

router.use("/owner", ownerRoute)
router.use("/delivery", deliveryRoute)
router.use("/users", usersRoute)
router.use("/local", local)

module.exports = router;
