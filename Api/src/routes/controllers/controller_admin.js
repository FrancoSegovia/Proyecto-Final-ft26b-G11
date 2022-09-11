const mongoose = require("mongoose");
const localSchema = require("../../schema/Local");
const userSchema = require("../../schema/User");
const deliverySchema = require("../../schema/Delivery");
const ownerSchema = require("../../schema/Owner");

const getOwner = (req, res) => {
  const { name } = req.query;
  if (name) {
    ownerSchema
      .find({ name: new RegExp(req.query.name.toLowerCase(), "i") })
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(404).json({ message: error }));
  } else {
    ownerSchema
      .find()
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(404).json({ message: error }));
  }
};

const getDelivery = (req, res) => {
  const { name } = req.query;
  if (name) {
    deliverySchema
      .find({ name: new RegExp(req.query.name.toLowerCase(), "i") })
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(404).json({ message: error }));
  } else {
    deliverySchema
      .find()
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(404).json({ message: error }));
  }
};

const deleteLocal = (req, res) => {
  const { id } = req.params;

  localSchema
    .remove({ _id: id })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(404).json({ message: error }));
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  try {
    userSchema.findOne({ _id: id }).then((data) => {
      data.isBanned = true;
      data
        .save()
        .then(() => {
          res.status(200).json({ data });
        })
        .catch((error) => res.status(404).json({ message: error }));
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteOwner = (req, res) => {
  const { id } = req.params;

  try {
    ownerSchema.findOne({ _id: id }).then((data) => {
      data.isBanned = true;

      data
        .save()
        .then(() => {
          res.status(200).json({ data });
        })
        .catch((error) => res.status(404).json({ message: error }));
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteDelivery = (req, res) => {
  const { id } = req.params;

  try {
    deliverySchema.findOne({ _id: id }).then((data) => {
      data.isBanned = true;
      data
        .save()
        .then(() => {
          res.status(200).json({ data });
        })
        .catch((error) => res.status(404).json({ message: error }));
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getOwner,
  getDelivery,
  deleteLocal,
  deleteUser,
  deleteOwner,
  deleteDelivery,
};
