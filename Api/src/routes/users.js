const express = require("express");

const router = express.Router();

const controllers = require("../controllers/users")
const { createUsers } = require("../controllers/users")

// Create routes

router.post("/", (req, res) => {
    const { name, lastName, eMail, password, phone } = req.body
    res.send(controllers.createUsers(name, lastName, eMail, password, phone))
    
});

module.exports = router