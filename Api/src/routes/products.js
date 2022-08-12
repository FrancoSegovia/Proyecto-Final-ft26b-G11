const productSchema = require("../schema/Product");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router()

function getModelByName(name) {
    return mongoose.model(name);
  }

router.post("/", (req, res) => {
  const product = productSchema(req.body);

  const products = getModelByName("Product")
    
  products
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ msg: error }));
});

// router.get("/", (req, res) => {
//     const { name } = req.query;
//     const products = getModelByName("Product")
//     if (name) {
    
//       products
//           .find({ name: new RegExp(req.query.name.toLowerCase(), "i") })
//           .then((data) => res.json(data))
//           .catch((error) => res.json({ message: error }));
//         } else {
//         products
//             .find()
//             .then((data) => res.json(data))
//             .catch((error) => res.json({ message: error }));
//   }
// });


module.exports = router