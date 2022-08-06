const mongoose = require("mongoose");

const localSchema = mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  direction: {
    type: String,
    required: true,
  },
  category: [{
    type: String,
    required: true,
  }],
  image: {
    type: String,
    required: true,
  },
  products: [
    new mongoose.Schema({
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
      type: [{
        type: String,
        required: true,
      }],
    }),
  ],
});

module.exports = mongoose.model("Locals", localSchema);
