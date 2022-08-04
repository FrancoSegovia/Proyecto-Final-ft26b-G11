const mongoose = require("mongoose");
require("mongoose-type-email");

const ownerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  state: {
    type: String,
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
  },
  local: [
    {
      name: {
        type: String,
        required: true,
      },
      direction: {
        type: String,
        required: true,
      },
      tel: {
        type: Number,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      products: [
        {
          name: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          image: {
            type: String,
            required: false,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Owners", ownerSchema);
