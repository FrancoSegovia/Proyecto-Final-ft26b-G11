const express = require("express");
const router = express.Router();

const mockupJson = require('../schema/Foods.json')

router.get("/", (req, res) => {
    
    mockupJson
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

module.exports = router;