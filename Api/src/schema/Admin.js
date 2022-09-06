const { Schema, model } = require("mongoose");

const schema = Schema(
  {
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    type: {
      type: String,
      required: false,
      default: "admin",
    },
  },
  { collection: "admins" }
);

module.exports = model("Admin", schema);
