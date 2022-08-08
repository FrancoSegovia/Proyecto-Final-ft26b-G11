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