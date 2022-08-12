const { Schema, model } = require("mongoose");

const schema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    type: [
      {
        type: String,
        required: true,
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
