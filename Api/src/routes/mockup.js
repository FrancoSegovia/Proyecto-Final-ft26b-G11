const express = require("express");
const router = express.Router();

const mockupJson = require('../schema/foods.json')

router.get("/", (req, res) => {
    const mockup = mockupJson(req.body)
    mockup
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

module.exports = router;