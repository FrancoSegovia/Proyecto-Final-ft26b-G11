const { Schema, model } = require("mongoose");

const schema = Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { collection: "orders" }
);

module.exports = model("Order", schema);