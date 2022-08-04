const { Router } = require('express');

const ownerRoute = require('./owner')
const deliveryRoute = require('./delivery')
const usersRoute = require('./users')

const router = Router();

router.use("/users", usersRoute)

module.exports = router;
