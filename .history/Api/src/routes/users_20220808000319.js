const express = require("express");
const userController

const router = express.Router();

// Create routes

router.post("/", (req, res) => {
    const user = userSchema(req.body);
    user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ msg: error}));
});

module.exports = router