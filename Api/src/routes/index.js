const { Router } = require('express');

const ownerRoute = require('./owner')
const deliveryRoute = require('./delivery')
const usersRoute = require('./users')
const mockup = require('./mockup')

const router = Router();

router.use("/mockup", mockup)
router.use("/owner", ownerRoute)
router.use("/delivery", deliveryRoute)
router.use("/users", usersRoute)

module.exports = router;
