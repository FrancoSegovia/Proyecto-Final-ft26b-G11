const mongoose = require("mongoose");
const ownerSchema = require("../../schema/Owner");
const userSchema = require("../../schema/User");
const deliverySchema = require("../../schema/Delivery");
const productSchema = require("../../schema/Product");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  const Owner = getModelByName("Owner");
  const Delivery = getModelByName("Delivery");

  let correctModel;

  if (await User.find({ email: req.body.email })) {
    console.log("correctModel");
    correctModel = await User.findOne({ email });
    console.log(correctModel);

    if (!correctModel) throw new Error("incorrect credentials");
    if (!correctModel.emailVerified) throw new Error("user is not confirmed");
    if (correctModel.isBanned === true) throw new Error("user is banned");
    const isMatch = bcrypt.compareSync(password, correctModel.password);
    if (!isMatch) throw new Error("incorrect credentials");

    if (correctModel !== null) {
      const userObject = {
        _id: correctModel._id,
        direction: correctModel.direction,
        type: correctModel.type,
        email: correctModel.email,
        emailVerified: correctModel.emailVerified,
        name: correctModel.name,
        lastname: correctModel.lastname,
      };

      const accessToken = jwt.sign(
        Object.assign({}, userObject),
        process.env.TOKEN_SECRET,
        {
          expiresIn: 60 * 60 * 10,
        }
      );
      console.log(accessToken);
      return accessToken;
    }
  }

  if (await Delivery.find({ email: req.body.email })) {
    console.log("correctModel1");
    correctModel = await Delivery.findOne({ email });
    console.log(correctModel);

    if (!correctModel) throw new Error("incorrect credentials");
    if (!correctModel.emailVerified) throw new Error("user is not confirmed");
    if (correctModel.isBanned === true) throw new Error("user is banned");
    const isMatch = bcrypt.compareSync(password, correctModel.password);
    if (!isMatch) throw new Error("incorrect credentials");

    if (correctModel !== null) {
      const userObject = {
        _id: correctModel._id,
        direction: correctModel.direction,
        type: correctModel.type,
        email: correctModel.email,
        emailVerified: correctModel.emailVerified,
        name: correctModel.name,
        lastname: correctModel.lastname,
      };

      const accessToken = jwt.sign(
        Object.assign({}, userObject),
        process.env.TOKEN_SECRET,
        {
          expiresIn: 60 * 60 * 10,
        }
      );
      console.log(accessToken);
      return accessToken;
    }
  }
  if (await Owner.find({ email: req.body.email })) {
    console.log("correctModel2");
    correctModel = await Owner.findOne({ email });
    console.log(correctModel);

    if (!correctModel) throw new Error("incorrect credentials");
    if (!correctModel.emailVerified) throw new Error("user is not confirmed");
    if (correctModel.isBanned === true) throw new Error("user is banned");
    const isMatch = bcrypt.compareSync(password, correctModel.password);
    if (!isMatch) throw new Error("incorrect credentials");

    if (correctModel !== null) {
      const userObject = {
        _id: correctModel._id,
        direction: correctModel.direction,
        type: correctModel.type,
        email: correctModel.email,
        emailVerified: correctModel.emailVerified,
        name: correctModel.name,
        lastname: correctModel.lastname,
      };

      const accessToken = jwt.sign(
        Object.assign({}, userObject),
        process.env.TOKEN_SECRET,
        {
          expiresIn: 60 * 60 * 10,
        }
      );
      console.log(accessToken);
      return accessToken;
    }
  }
};

// correctModel.then((user) => {

// console.log(userObject);

// }

//!-------------------------------------

// function login(email, password, correctModel) {
//   if (!isValidEmail(email)) throw new Error("email is invalid");

//   return correctModel.findOne({ email }).then((user) => {
//     if (!user) throw new Error("incorrect credentials");
//     if (!user.emailVerified) throw new Error("user is not confirmed");
//     if (user.isBanned === true) throw new Error("user is banned")
//     const isMatch = bcrypt.compareSync(password, user.password);
//     if (!isMatch) throw new Error("incorrect credentials");

//     const userObject = {
//       _id: user._id,
//       type: user.type,
//       email: user.email,
//       emailVerified: user.emailVerified,
//       name: user.name,
//       lastname: user.lastname,
//     };
//     const accessToken = jwt.sign(
//       Object.assign({}, userObject),
//       process.env.TOKEN_SECRET,
//       {
//         expiresIn: 60 * 60 * 10,
//       }
//     );
//     return {
//       accessToken,
//     };
//   });
// }
//!-------------------------------------

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
