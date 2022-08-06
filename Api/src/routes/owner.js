const express = require("express");
const router = express.Router();

const ownerSchema = require('../schema/Owner.js')

router.post("/", (req, res) => {
    const owner = ownerSchema(req.body)
    owner
    .save().then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

router.put("/:id", (req,res) => {
    const {id} = req.params;
    const owner = ownerSchema(req.body)
    owner
})

module.exports = router;