const express = require("express");
const ownerController = require("../routes/controllers/controller_owners") 
const router = express.Router();

router.post("/", ownerController.post);

module.exports = router;