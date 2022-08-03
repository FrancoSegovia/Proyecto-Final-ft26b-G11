const express = require("express");
const router = express.Router();

const deliverySchema = require('../schema/Delivery.js')

router.post("/delivery", (req, res) => {
    const delivery = deliverySchema(req.body)
    delivery
    .save().then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

module.exports = router;