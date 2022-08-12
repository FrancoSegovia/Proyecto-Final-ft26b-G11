const mongoose = require("mongoose");
const ownerSchema = require("../../schema/Owner");
const localSchema = require("../../schema/Local");
const userSchema = require("../../schema/User");
const deliverySchema = require("../../schema/delivery");

const getOwner = (req, res) => {
  const { name } = req.query;
  if (name) {
    ownerSchema
      .find({ name: new RegExp(req.query.name.toLowerCase(), "i") })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } else {
    ownerSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  }
};

const getDelivery = (req, res) => {
  const { name } = req.query;
  if (name) {
    deliverySchema
      .find({ name: new RegExp(req.query.name.toLowerCase(), "i") })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } else {
    deliverySchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  }
};

const deleteLocal = (req, res) => {
  const { id } = req.params;

  localSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  userSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const deleteOwner = (req, res) => {
  const { id } = req.params;

  ownerSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const deleteDelivery = (req, res) => {
  const { id } = req.params;

  deliverySchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

module.exports = {
  getOwner,
  getDelivery,
  deleteLocal,
  deleteUser,
  deleteOwner,
  deleteDelivery,
};
