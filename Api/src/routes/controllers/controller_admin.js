const mongoose = require("mongoose");
const adminSchema = require("../../schema/Admin");
const localSchema = require("../../schema/Local");
const userSchema = require("../../schema/User");
const deliverySchema = require("../../schema/Delivery");
const bcrypt = require("bcrypt");


function getModelByName(name) {
  return mongoose.model(name);
}
const signup = (req, res) => {
  if (!req.body.admin)
    return res
      .status(200)
      .send({ success: false, error: "admin info not found" });
  const Admin = getModelByName("Admin");
  try {
    Admin.signup(req.body.admin)
      .then(() => {
        res
          .status(200)
          .send({ success: true, message: "admin created succesfully" });
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
  const Admin = getModelByName("Admin");
  try {
    Admin.confirmAccount(req.params.token)
      .then(() => {
        res
          .status(200)
          .send({ success: true, message: "admin confirmed succesfully" });
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
  const Admin = getModelByName("Admin");
  try {
    Admin.login(req.body.email, req.body.password)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) =>
        res.status(200).send({ success: false, error: error.message })
      );
  } catch (error) {
    res.status(200).send({ success: false, error: error.message });
  }
};

//!-------------------------------------

const getAdmin = (req, res) => {
  const { name } = req.query;
  if (name) {
    adminSchema
      .find({ name: new RegExp(req.query.name.toLowerCase(), "i") })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } else {
    adminSchema
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

  userSchema.findOne({ _id: id }).then((data) => {
    data.isBanned = true;
    data.save().then(() => {
      res.json({ data });
    });
  });
};

const deleteAdmin = (req, res) => {
  const { id } = req.params;

  adminSchema.findOne({ _id: id }).then((data) => {
    data.isBanned = true;
    data.save().then(() => {
      res.json({ data });
    });
  });
};

const deleteDelivery = (req, res) => {
  const { id } = req.params;

  deliverySchema.findOne({ _id: id }).then((data) => {
    data.isBanned = true;
    data.save().then(() => {
      res.json({ data });
    });
  });
};

module.exports = {
  login,
  confirmAccount,
  signup,
  getAdmin,
  getDelivery,
  deleteLocal,
  deleteUser,
  deleteAdmin,
  deleteDelivery,
};
