const mongoose = require("mongoose");
require("mongoose-type-email");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  eMail: {
    type: mongoose.SchemaTypes.Email,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  phone: {
    type: Number,
    required: true,
  },

  credencialesPago: [
    {
      name: {
        type: String,
        required: true,
      },
      number: {
        type: Number,
        required: true,
      },
      code: {
        type: Number,
        required: true,
      },
      dateOfExpire: {
        type: Date,
        required: true,
      },
    },
  ],

  favorites: {
    type: Array,
    default: undefined,
  },

  comments: {
    type: Array,
    default: undefined,
  },

  paymentRecord: {
    type: String,
    required: false,
  },

  balance: {
    type: Number,
    required: false,
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("User", userSchema);

