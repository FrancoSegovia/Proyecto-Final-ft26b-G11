const ownerSchema = require("../../schema/owner");
const mongoose = require("mongoose");

//!-------------------------------------
function getModelByName(name) {
  return mongoose.model(name);
}

const signup = (req, res) => {
  if (!req.body.owner)
    return res
      .status(200)
      .send({ success: false, error: "owner info not found" });

  const Owner = getModelByName("owner");

  try {
    Owner.signup(req.body.owner)
      .then(() => {
        res
          .status(200)
          .send({ success: true, message: "owner created succesfully" });
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
  const Owner = getModelByName("owner");

  try {
    Owner.confirmAccount(req.params.token)
      .then(() => {
        res
          .status(200)
          .send({ success: true, message: "owner confirmed succesfully" });
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

  const Owner = getModelByName("owner");

  try {
    Owner.login(req.body.email, req.body.password)
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
//!-------------------------------------

const currentOwner = (req, res) => {
  if (!req.owner)
    return res
      .status(200)
      .send({ success: false, data: {owner: null} });

  const Owner = getModelByName("owner");

  return Owner.findOwnerById(req.owner._id)
  .then(owner => {
    res.status(200).send({success: true, data: {owner}})
  }).catch(error => res.status(200).send({success: false, error: error.message}))
};

//!-------------------------------------

//?---------------------------------------

const post = (req, res) => {
  const owner = ownerSchema(req.body);
  owner
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

module.exports = { post, signup, confirmAccount, login, currentOwner };
