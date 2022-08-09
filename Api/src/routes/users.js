const express = require("express");
const userController = require("../routes/controllers/controller_users");
const router = express.Router();




router.post("/login", userController.post);
router.get("/", userController.get);
router.post("/post", verifyToken, userController.postVerify)

module.exports = router;
