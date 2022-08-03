const { Router } = require('express');
const router = Router();

const ownerRoute = require('./owner')
const deliveryRoute = require('./delivery')
const usersRoute = require('./users')


module.exports = router;