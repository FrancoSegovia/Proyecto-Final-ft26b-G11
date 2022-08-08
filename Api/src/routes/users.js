const express = require("express");
const userController = require("../routes/controllers/controller_users") 
const router = express.Router();

router.post("/", userController.post);

router.get("/", (req, res) => {
    const { name } = req.query;
    if (name) {
      userSchema
        .find({ name: new RegExp(req.query.name.toLowerCase(), "i") })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
    } else {
      userSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
    }
  });
  
module.exports = router