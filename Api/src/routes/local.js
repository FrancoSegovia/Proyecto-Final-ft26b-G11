const express = require("express");
const mongose = require("mongoose");
const router = express.Router();

const localSchema = require("../schema/Locals.js");

router.post("/", (req, res) => {
  const local = localSchema(req.body);
  local
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get("/", (req, res) => {
  const { name } = req.query;
  if (name) {
    localSchema
      .find({ name: new RegExp(req.query.name.toLowerCase(), "i") })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } else {
    localSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  localSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;

