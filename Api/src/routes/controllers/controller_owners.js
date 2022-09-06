const mongoose = require("mongoose");
const ownerSchema = require("../../schema/Owner");
const localSchema = require("../../schema/Local");
const productSchema = require("../../schema/Product");
const bcrypt = require("bcrypt");
const Product = require("../../schema/Product");
//!-------------------------------------

function getModelByName(name) {
  return mongoose.model(name);
}
const signup = (req, res) => {
  if (!req.body)
    return res
      .status(204)
      .send({ success: false, error: "owner info not found" });
  const Owner = getModelByName("Owner");
  try {
    Owner.signup(req.body)
      .then(() => {
        res
          .status(200)
          .send({ success: true, message: "owner created succesfully" });
      })
      .catch((error) =>
        res.status(404).send({ success: false, error: error.message })
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
        res.status(404).send({ success: false, error: err.message })
      );
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
};

//!-------------------------------------

//?---------------RUTAS CRUD----------------------------

//*---------------GET DETAIL OWNER----------------------------
const currentOwner = (req, res) => {
  if (!req.owner)
    return res.status(204).send({ success: false, data: { owner: null } });

  const Owner = getModelByName("Owner");
  Owner.findOwnerById(req.owner._id)
    .then((owner) => {
      res.status(200).send(owner);
    })
    .catch((error) =>
      res.status(404).send({ success: false, error: error.message })
    );
};
//*---------------GET DETAIL OWNER----------------------------

//*---------------GET GENERAL LOCAL----------------------------
const getLocal = async (req, res) => {
  const { id } = req.params;
  const ownerId = await ownerSchema.findById(id);
  localSchema
    .find({ owner: ownerId })
    .populate("products", { inCart: 0 })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(404).send({ message: error }));
};
//*---------------GET GENERAL LOCAL----------------------------

//*---------------GET DETAIL LOCAL----------------------------
const getLocalById = (req, res) => {
  const { id } = req.params;
  const Local = getModelByName("Local");
  Local.findById(id)
    .populate("products")
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(404).send({ message: error }));
};
//*---------------GET DETAIL LOCAL----------------------------

//*---------------POST LOCAL----------------------------
const addLocal = (req, res) => {
  const Local = getModelByName("Local");
  Local.addLocal(req.body, req.owner._id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => res.status(404).send({ message: error }));
};
//*---------------POST LOCAL----------------------------

//*---------------POST PRODUCT----------------------------
const addProduct = async (req, res) => {
  const Product = getModelByName("Product");

  try {
    const { name, price, idLocal } = req.body;

    const localId = await localSchema.findById(idLocal);

    if (!name)
      return res
        .status(204)
        .json({ error: 'Required "name" field is missing' });
    if (!price)
      return res
        .status(204)
        .json({ error: 'Required "price" field is missing' });

    const newProduct = new Product({
      name,
      price,
      local: localId._id,
    });

    const savedProduct = await newProduct.save();

    localId.products = localId.products.concat(savedProduct._id);
    await localId.save();

    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(404).send({ success: false, error: error.message });
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
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(404).json({ message: error }));
};

const deleteLocal = (req, res) => {
  const { id } = req.params;

  localSchema
    .remove({ _id: id })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(404).json({ message: error }));
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, image, price, type } = req.body;

  productSchema
    .updateOne({ _id: id }, { $set: { name, description, image, price, type } })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(404).json({ message: error }));
};

const deleteProduct = (req, res) => {
  const { id } = req.params;

  productSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const localId = await localSchema.findById(id);
  productSchema
    .find({ local: localId })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(404).send({ message: error }));
};

const updateCurrentOwner = (req, res) => {
  const { id } = req.params;
  const { name, lastname, password } = req.body;

  ownerSchema
    .updateOne(
      { _id: id },
      { $set: { name, lastname, password: bcrypt.hashSync(password, 9) } }
    )
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(404).json({ message: error }));
};

module.exports = {
  signup,
  confirmAccount,
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
