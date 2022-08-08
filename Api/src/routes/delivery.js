const express = require("express");
const deliveryController = require("../routes/controllers/controller_deliverys") 
const router = express.Router();

router.post("/", deliveryController.post);

module.exports = router;