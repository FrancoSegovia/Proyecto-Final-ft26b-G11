const mongoose = require("mongoose");
const deliverySchema = require("../../schema/Delivery");
const localSchema = require("../../schema/Local");
const productSchema = require("../../schema/Product");
const bcrypt = require("bcrypt");
//!-------------------------------------

function getModelByName(name) {
  return mongoose.model(name);
}
const signup = (req, res) => {
  if (!req.body.delivery)
    return res
      .status(200)
      .send({ success: false, error: "delivery info not found" });
  const Delivery = getModelByName("Delivery");
  try {
    Delivery.signup(req.body.delivery)
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
//!-------------------------------------

const login = (req, res) => {
  if (!req.body.email)
    return res
      .status(200)
      .send({ success: false, error: "email is not provided" });
  if (!req.body.password)
    return res
      .status(200)
      .send({ success: false, error: "password is not provided" });
  const Delivery = getModelByName("Delivery");
  try {
    Delivery.login(req.body.email, req.body.password)
      .then((data) => {
        res.status(200).send({ success: true, data });
      })
      .catch((error) =>
        res.status(200).send({ success: false, error: error.message })
      );
  } catch (error) {
    res.status(200).send({ success: false, error: error.message });
  }
};

//!-------------------------------------

const currentDelivery = (req, res) => {
  if (!req.delivery)
    return res.status(200).send({ success: false, data: { delivery: null } });
  const Delivery = getModelByName("Delivery");
  return Delivery.findUserById(req.delivery._id)
    .then((delivery) => {
      res.status(200).send({ success: true, data: { delivery } });
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

module.exports = { signup,confirmAccount,login, currentDelivery, updatecurrentDelivery };