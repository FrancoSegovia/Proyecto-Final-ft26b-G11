const { Schema, model } = require("mongoose")

const schema =  Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }, 
    price: {
        type: Number, 
        required: true
    }, 
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false,
      }, 
}, { collection: "carts" } 
);

module.exports = model("Cart", schema)