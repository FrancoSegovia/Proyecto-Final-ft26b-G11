const { Schema, model } = require("mongoose")

const schema =  Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
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
}, { collection: "carts" } 
);

module.exports = model("Cart", schema)