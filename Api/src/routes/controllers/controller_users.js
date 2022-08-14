const mongoose = require("mongoose");
const ownerSchema = require("../../schema/Owner");
const userSchema = require("../../schema/User");
const deliverySchema = require("../../schema/delivery")
const productSchema = require("../../schema/Product");
const bcrypt = require("bcrypt");

const get = (req, res) => {
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
};

//!-----------------------------------------------------
function getModelByName(name) {
  return mongoose.model(name);
}

const signup = (req, res) => {

  if (!req.body)

    return res
      .status(200)
      .send({ success: false, error: "user info not found" });
  const User = getModelByName("User");
  try {
    User.signup(req.body)
      .then(() => {
        res
          .status(200)
          .send({ success: true, message: "user created succesfully" });
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
  const User = getModelByName("User");
  try {
    User.confirmAccount(req.params.token)
      .then(() => {
        res
          .status(200)
          .send({ success: true, message: "user confirmed succesfully" });
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

  const User = getModelByName("User");
  const Owner = getModelByName("Owner");
  const Delivery = getModelByName("Delivery");

  try {
    User.login(req.body.email, req.body.password)
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

const currentUser = (req, res) => {
  const {id} = req.params;
  if (!id)
    return res.status(200).send({ success: false, data: { user: null } });
userSchema.findById(id)
    .then((user) => {
      res.status(200).send( user );
    })
    .catch((error) =>
      res.status(200).send({ success: false, error: error.message })
    );
};

const updateCurrentUser = (req, res) => {
  const { id } = req.params;
  const { name, lastname, password } = req.body;

  userSchema
    .updateOne(
      { _id: id },
      { $set: { name, lastname, password: bcrypt.hashSync(password, 9) } }
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const getLocal = (req, res) => {
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
};

module.exports = {
  get,
  signup,
  confirmAccount,
  login,
  currentUser,
  updateCurrentUser,
  getLocal,
};
