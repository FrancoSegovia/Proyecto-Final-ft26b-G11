const mongoose = require("mongoose");
const userSchema = require("../../schema/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const localSchema = require("../../schema/Local");
const admindSchema = require("../../schema/Admin");
const productSchema = require("../../schema/Product");

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

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!req.body.email)
    return res
      .status(200)
      .send({ success: false, error: "email is not provided" });
  if (!req.body.password)
    return res
      .status(200)
      .send({ success: false, error: "password is not provided" });

  const User = getModelByName("User");
  const Admin = getModelByName("Admin");
  const Owner = getModelByName("Owner");
  const Delivery = getModelByName("Delivery");

  let correctModel;

  if (await User.find({ email: req.body.email })) {
   correctModel = await userSchema.findOne({ email }).populate("order")
    console.log(correctModel)

    if (correctModel !== null) {
      if (!correctModel.emailVerified)
        return res.status(400).send({ message: "Email is not verified" });
      if (correctModel.isBanned === true)
        return res.status(400).send({ message: "User banned" });
      const isMatch = bcrypt.compareSync(password, correctModel.password);
      if (!isMatch)
        return res.status(400).send({ message: "Incorrect password" });

      const userObject = {
        _id: correctModel._id,
        direction: correctModel.direction,
        type: correctModel.type,
        email: correctModel.email,
        emailVerified: correctModel.emailVerified,
        name: correctModel.name,
        lastname: correctModel.lastname,
        isBanned: correctModel.isBanned,
        order: correctModel.order
      };
      console.log(userObject)

      const accessToken = jwt.sign(
        Object.assign({}, userObject),
        process.env.TOKEN_SECRET,
        {
          expiresIn: 60 * 60 * 10,
        }
      );
      return res.status(200).json(accessToken);
    }
  }

  if (await Delivery.find({ email: req.body.email })) {
    correctModel = await Delivery.findOne({ email });

    if (correctModel !== null) {
      if (!correctModel.emailVerified)
        return res.status(400).send({ message: "Email is not verified" });
      if (correctModel.isBanned === true)
        return res.status(400).send({ message: "Delivery banned" });
      const isMatch = bcrypt.compareSync(password, correctModel.password);
      if (!isMatch)
        return res.status(400).send({ message: "Incorrect password" });

      const userObject = {
        _id: correctModel._id,
        direction: correctModel.direction,
        type: correctModel.type,
        email: correctModel.email,
        emailVerified: correctModel.emailVerified,
        name: correctModel.name,
        lastname: correctModel.lastname,
        isBanned: correctModel.isBanned,
      };

      const accessToken = jwt.sign(
        Object.assign({}, userObject),
        process.env.TOKEN_SECRET,
        {
          expiresIn: 60 * 60 * 10,
        }
      );
      return res.status(200).json(accessToken);
    }
  }
  if (await Owner.find({ email: req.body.email })) {
    correctModel = await Owner.findOne({ email });

    if (correctModel !== null) {
      if (!correctModel.emailVerified)
        return res.status(400).send({ message: "Email is not verified" });
      if (correctModel.isBanned === true)
        return res.status(400).send({ message: "Owner banned" });
      const isMatch = bcrypt.compareSync(password, correctModel.password);
      if (!isMatch)
        return res.status(400).send({ message: "Incorrect password" });

      const userObject = {
        _id: correctModel._id,
        direction: correctModel.direction,
        type: correctModel.type,
        email: correctModel.email,
        emailVerified: correctModel.emailVerified,
        name: correctModel.name,
        lastname: correctModel.lastname,
        isBanned: correctModel.isBanned,
      };

      const accessToken = jwt.sign(
        Object.assign({}, userObject),
        process.env.TOKEN_SECRET,
        {
          expiresIn: 60 * 60 * 10,
        }
      );
      return res.status(200).json(accessToken);
    }
  }
  if (await Admin.find({ email: req.body.email })) {
    correctModel = await Admin.findOne({ email });

    if (correctModel !== null) {
      if (password !== correctModel.password)
        return res.status(400).send({ message: "Incorrect password" });

      const userObject = {
        _id: correctModel._id,
        email: correctModel.email,
        type: correctModel.type,
      };

      const accessToken = jwt.sign(
        Object.assign({}, userObject),
        process.env.TOKEN_SECRET,
        {
          expiresIn: 60 * 60 * 10,
        }
      );
      return res.status(200).json(accessToken);
    }
  }
  if (!correctModel)
    return res.status(400).send({ message: "Incorrect email" });
};
//!-------------------------------------
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

const currentUser = (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(200).send({ success: false, data: { user: null } });
  userSchema
    .findById(id)
    .then((user) => {
      res.status(200).send(user);
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
      .populate("products")
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } else {
    localSchema
      .find()
      .populate("products")
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  }
};

const getProductSearch = async (req, res) => {
  const { id } = req.params
  const { name } = req.query

  console.log(id);
  console.log(name);

  const search = await productSchema
    .find({
      local: id,
      name: new RegExp(name.toLowerCase(), "i"),
    })
    .catch((error) => res.json({ message: error }));

  res.status(200).json(search);
};

module.exports = {
  get,
  signup,
  confirmAccount,
  login,
  currentUser,
  updateCurrentUser,
  getLocal,
  getProductSearch,
};
