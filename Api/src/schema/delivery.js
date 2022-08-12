const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { isValidEmail } = require("../routes/controllers/helpers");

const schema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    transport: {
      type: String,
      required: true,
    },
    tel: {
      type: Number,
      required: true,
    },
    shipments: {
      type: Number,
      required: true,
    },
  },
  { collection: "deliverys" }
);

module.exports = model("Delivery", schema);
