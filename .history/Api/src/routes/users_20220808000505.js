const express = require("express");
const userController = require("../routes/controllers/controller_users") 

const router = express.Router();

// Create routes

router.post("/", userController.show);

module.exports = router