const express = require("express");
const router = express.Router();

const controllers = require("../controllers/mockup")
const { getProduct, getProductById } = require("../controllers/mockup")


router.get("/", (req, res) => {
    const {name} = req.query
    res.send(controllers.getProduct(name))
})

router.get("/:id", (req, res) => {
    const {id} = req.params
    res.send(controllers.getProductById(id))
   
})

module.exports = router;