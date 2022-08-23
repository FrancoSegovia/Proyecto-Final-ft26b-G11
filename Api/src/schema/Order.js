const { Schema, model } = require("mongoose");

const schema = Schema(
  [{
    order: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    state: {
      type: String,
      default: "Despachando su pedido"
    },
    selection: {
      type: String,
      default: false
    },
    delivery: {
      type: Schema.Types.ObjectId,
      ref: "Delivery",
    }
  }],
  { collection: "orders" }
);

module.exports = model("Order", schema);