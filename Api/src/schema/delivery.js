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
  document: {
    type: String,
    required: true,
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

module.exports = mongoose.model("Deliverys", deliverySchema);
