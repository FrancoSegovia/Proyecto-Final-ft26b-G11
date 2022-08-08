const express = require("express");
const userSchema = require("../schema/Users");

const router = express.Router();

// Create routes

router.post("/", (req, res) => {
    const user = userSchema(req.body);
    user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ msg: error}));
});

router.get("/", (req, res) => {
    
    const { name } = req.query;
    userSchema.findOne({name: new RegExp('^'+name+'$', "i")})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));


 
    
    
    




    // try {
    //     if(name){
    //         const userByName = userSchema.find((u) => u.name.toLocaleLowerCase().includes(name.toLocaleLowerCase))
    //         if(userByName){
    //             return res.send(userByName)
    //             console.log(userByName)
    //         }
    //         res.status(404).send("No se encontro el nombre buscado")
    //     }else{
    //         res.send(userSchema)
    //     }
    // } catch (error) {
    //     res.json({message: error})
    // }
    // userSchema


    // try {
    //     if(name){
    //         const localByName = myLocal.filter((l) => l.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
    //         if(localByName.length){
    //             return res.send(localByName)
    //         }
    //         res.status(404).send("No se encontro el producto")
    //     }else{
    //         res.send(myLocal)
    //     }
    // } catch (error) {
    //     console.log(error)

})

module.exports = router