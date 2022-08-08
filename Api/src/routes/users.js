const express = require("express");
const userController = require("../routes/controllers/controller_users") 
const router = express.Router();

router.post("/", userController.post);

module.exports = router