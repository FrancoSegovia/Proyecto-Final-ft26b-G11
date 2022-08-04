const express = require("express");
const router = express.Router();

var myFoods = require("../schema/Foods.json")



router.get("/", (req, res) => {
  try {
       
    res.send(myFoods)
    
    
  } catch (error) {
    console.log(error)
  }
     
})





module.exports = router;