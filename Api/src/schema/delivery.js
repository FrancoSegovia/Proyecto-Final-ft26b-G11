const mongoose = require("mongoose");
require("mongoose-type-email");
const deliverySchema = mongoose.Schema({
  nameDelivery: {
    firstname: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
  },

  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  transport: {
    type: String,
    required: true,
  },
  tel: {
    type: Number,
    required: true,
  },
  shipments: {
    type: Number,
    required: true,
  },
});

deliverySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Delivery", deliverySchema);
