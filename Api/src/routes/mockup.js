const express = require("express");
const router = express.Router();

const myFoods = require("../schema/Foods.json");

router.get("/", (req, res) => {
    const {name} = req.query
    try {
        if(name){
            const foodByName = myFoods.filter((f) => f.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
            if(foodByName.length){
                return res.send(foodByName)
            }
            res.status(404).send("No se encontro el producto")
        }else{
            res.send(myFoods)
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/:id", (req, res) => {
    const {id} = req.params
    try {
     const foodById = myFoods.find(obj => obj.id.toString() === id)
     console.log(typeof (id));
     res.send(foodById)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;