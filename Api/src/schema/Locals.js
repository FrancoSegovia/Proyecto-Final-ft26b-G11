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
  category: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    require: false,
  },
  description: {
    type: String,
    require: false,
  },
  image: {
    type: String,
    required: false,
  },
  Products: [
    new mongoose.Schema({
      name: {
        type: String,
        required: false,
      },
      description: {
        type: String,
        required: false,
      },
      image: {
        type: String,
        required: false,
      },
      price: {
        type: Number,
        required: false,
      },
      inCart: {
        type: Boolean,
        required: true
      },
      type: [
        {
          type: String,
          required: false,
        },
      ],
    }),
  ],
});

localSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Local", localSchema);

