const express = require("express");
const router = express.Router();

const controllers = require("../controllers/local")
const { getLocal, getLocalById } = require("../controllers/local") 


router.get("/", (req, res) => {
    const {name} = req.query
    res.send(controllers.getLocal(name))
    
})

router.get("/:id", (req, res) => {
    const {id} = req.params
    res.send(controllers.getLocalById(id))
    
})

module.exports = router;