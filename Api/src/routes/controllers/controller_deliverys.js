const mongoose = require("mongoose");
const deliverySchema = require("../../schema/Delivery");
const bcrypt = require("bcrypt");
//!-------------------------------------

function getModelByName(name) {
  return mongoose.model(name);
}
const signup = (req, res) => {
  if (!req.body)
    return res
      .status(200)
      .send({ success: false, error: "delivery info not found" });
  const Delivery = getModelByName("Delivery");
  try {
    Delivery.signup(req.body)
      .then(() => {
        res
          .status(200)
          .send({ success: true, message: "delivery created succesfully" });
      })
      .catch((error) =>
        res.status(200).send({ success: false, error: error.message })
      );
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

//!-------------------------------------
//!-------------------------------------

const confirmAccount = (req, res) => {
  const Delivery = getModelByName("Delivery");
  try {
    Delivery.confirmAccount(req.params.token)
      .then(() => {
        res
          .status(200)
          .send({ success: true, message: "delivery confirmed succesfully" });
      })
      .catch((err) =>
        res.status(200).send({ success: false, error: err.message })
      );
  } catch (err) {
    res.status(200).send({ success: false, error: err.message });
  }
};

//!-------------------------------------


const currentDelivery = (req, res) => {
    const {id} = req.params;
    if (!id)
      return res.status(200).send({ success: false, data: { delivery: null } });
  deliverySchema.findById(id)
      .then((delivery) => {
        res.status(200).send( delivery );
      })
      .catch((error) =>
        res.status(200).send({ success: false, error: error.message })
      );
  };

const updatecurrentDelivery = (req, res) => {
  const { id } = req.params;
  const { name, lastname, password} = req.body;

  deliverySchema
    .updateOne({ _id: id }, { $set: { name, lastname, password: bcrypt.hashSync(password, 9) } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

module.exports = { signup,confirmAccount, currentDelivery, updatecurrentDelivery };