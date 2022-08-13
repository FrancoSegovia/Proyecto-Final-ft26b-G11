const mongoose = require("mongoose");
const ownerSchema = require("../../schema/Owner");
const localSchema = require("../../schema/Local");
const productSchema = require("../../schema/Product");
const bcrypt = require("bcrypt");
//!-------------------------------------

function getModelByName(name) {
  return mongoose.model(name);
}
const signup = (req, res) => {
  if (!req.body.owner)
    return res
      .status(200)
      .send({ success: false, error: "owner info not found" });
  const Owner = getModelByName("Owner");
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
  const Owner = getModelByName("Owner");
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
  const Owner = getModelByName("Owner");
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

//?---------------RUTAS CRUD----------------------------

//*---------------GET DETAIL OWNER----------------------------
const currentOwner = (req, res) => {
  if (!req.owner)
    return res.status(200).send({ success: false, data: { owner: null } });
  const Owner = getModelByName("Owner");
  return Owner.findOwnerById(req.owner._id)
    .then((owner) => {
      res.status(200).send({ success: true, data: { owner } });
    })
    .catch((error) =>
      res.status(200).send({ success: false, error: error.message })
    );
};
//*---------------GET DETAIL OWNER----------------------------

//*---------------GET GENERAL LOCAL----------------------------
const getLocal = (req, res) => {
  const Owner = getModelByName("Owner");
  const Local = getModelByName("Local");
  const { id } = req.params;
  Local.find({ id }, function (err, locals) {
    Owner.populate(locals, { path: "owner" }, function (err, locals) {
      res.status(200).send(locals);
    });
  });
};
//*---------------GET GENERAL LOCAL----------------------------

//*---------------GET DETAIL LOCAL----------------------------
const getLocalById = (req, res) => {
  const { id } = req.params;
  const Local = getModelByName("Local");
  Local.findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.status(200).send({ message: error }));
};
//*---------------GET DETAIL LOCAL----------------------------

//*---------------POST LOCAL----------------------------
const addLocal = (req, res) => {
  const Local = getModelByName("Local");
  try {
    Local.addLocal(req.body.local, req.owner._id)
      .then((data) => {
        res.status(200).send({ success: true, data: { data } });
      })
      .catch((error) => res.status(200).send({ message: error }));
  } catch (error) {
    res.status(200).send({ success: false, error: error.message });
  }
};
//*---------------POST LOCAL----------------------------

//*---------------POST PRODUCT----------------------------
const addProduct = async (req, res) => {
  const Product = getModelByName("Product");

  const { name, description, image, price, type, local } = req.body;

  const localId = await localSchema.findById(local);

  if (!name || !description || !image || !price || !type) {
    return res.status(400).json({
      error: "required field",
    });
  }

  const newProduct = new Product({
    name,
    description,
    image,
    price,
    type,
    local: localId.id,
  });
  try {
    const savedProduct = await newProduct.save();
    await localId.save();
    res.json(savedProduct);
  } catch (error) {
    res.status(200).send({ success: false, error: error.message });
  }
};
//*---------------POST PRODUCT----------------------------

const updateLocal = (req, res) => {
  const { id } = req.params;
  const { name, direction, category, schedule, description, image } = req.body;

  localSchema
    .updateOne(
      { _id: id },
      { $set: { name, direction, category, schedule, description, image } }
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const deleteLocal = (req, res) => {
  const { id } = req.params;

  localSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, image, price, type } = req.body;

  productSchema
    .updateOne({ _id: id }, { $set: { name, description, image, price, type } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const deleteProduct = (req, res) => {
  const { id } = req.params;

  productSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const getProduct = (req, res) => {
  const Local = getModelByName("Local");
  const Product = getModelByName("Product");

  const { id } = req.params;
  Product.find({ id }, function (err, products) {
    Local.populate(products, { path: "local" }, function (err, products) {
      res.status(200).send(products);
    });
  });
};

const updateCurrentOwner = (req, res) => {
  const { id } = req.params;
  const { name, lastname, password} = req.body;

  ownerSchema
    .updateOne({ _id: id }, { $set: { name, lastname, password: bcrypt.hashSync(password, 9) } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

module.exports = {
  signup,
  confirmAccount,
  login,
  currentOwner,
  getLocal,
  getLocalById,
  addLocal,
  addProduct,
  updateLocal,
  deleteLocal,
  updateProduct,
  deleteProduct,
  getProduct,
  updateCurrentOwner,

};
