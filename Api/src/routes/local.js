const express = require("express");
const router = express.Router();

const myLocal = require("../schema/Locals.json");

router.get("/", (req, res) => {
    const {name} = req.query
    try {
        if(name){
            const localByName = myLocal.filter((l) => l.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
            if(localByName.length){
                return res.send(localByName)
            }
            res.status(404).send("No se encontro el producto")
        }else{
            res.send(myLocal)
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/:id", (req, res) => {
    const {id} = req.params
    try {
     const localById = myLocal.find(obj => obj.id.toString() === id)
     res.send(localById)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;