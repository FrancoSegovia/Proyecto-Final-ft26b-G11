const { Schema, model } = require("mongoose")

const schema =  Schema({
    cart: {
        type: Schema.Types.ObjectId,
        ref: "Cart",
        required: true,
      }, 
    items: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },

            amount: {
                type: Number,
                default: 1
            },
        }
    ]
}, { collection: "orders" } 
);

module.exports = model("Order", schema)