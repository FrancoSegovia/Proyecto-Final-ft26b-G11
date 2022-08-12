const express = require("express");
const userController = require("./controllers/controller_users");
const router = express.Router();

router.post("/", userController.post);
router.get("/", userController.get);

module.exports = router;
