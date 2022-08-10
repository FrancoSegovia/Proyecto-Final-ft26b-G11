const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    }

})

CartSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id;
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });

module.exports = mongoose.model("Carts", CartSchema)