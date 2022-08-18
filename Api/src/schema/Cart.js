const { Schema, model } = require("mongoose")

const schema =  Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    order: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true
    }
}, { collection: "carts" } 
);

module.exports = model("Cart", schema)