const { Schema, model } = require("mongoose");

const schema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    type: [
      {
        type: String,
        required: false,
      },
    ],
    local: {
      type: Schema.Types.ObjectId,
      ref: "Local",
      required: true,
    },
  },
  { collection: "products" }
);

module.exports = model("Product", schema);
