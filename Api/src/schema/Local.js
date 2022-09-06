const { Schema, model } = require("mongoose");

const schema = Schema(
  {
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
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    owner: {
      type: Schema.ObjectId,
      ref: "Owner",
    },
  },
  { collection: "locals" }
);

function addLocal(localInfo, ownerId) {
  if (!localInfo.name) throw new Error("name is required");
  if (!localInfo.direction) throw new Error("direction is required");
  if (!localInfo.category) throw new Error("category is required");
  if (!localInfo.description) throw new Error("description is required");
  localInfo.owner = ownerId;

  const local = new this(localInfo);
  return local.save();
}

schema.statics.addLocal = addLocal;

module.exports = model("Local", schema);
