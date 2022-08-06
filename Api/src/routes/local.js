const express = require("express");
const router = express.Router();

const localSchema = require('../schema/Locals.js')

router.post("/", (req, res) => {
    const local = localSchema(req.body)
    local
    .save().then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

router.get("/", (req, res) => {
    const {name} = req.query
    const local = localSchema.filter((f) => f.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
    local
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

router.get("/", (req, res) => {
    localSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

router.get("/:id", (req, res) => {
    const {id} = req.params
    localSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})


module.exports = router;