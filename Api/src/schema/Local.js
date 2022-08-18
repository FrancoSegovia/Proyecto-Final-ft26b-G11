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
    schedule: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      // required: true,
    },
    products: [{
      type: Schema.Types.ObjectId,
      ref: "Product",

    }],
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
  // if (!localInfo.schedule) throw new Error("schedule is required");
  if (!localInfo.description) throw new Error("description is required");
  // if (!localInfo.image) throw new Error("image is required");
  localInfo.owner = ownerId;

  const local = new this(localInfo);
  return local.save();
}

schema.statics.addLocal = addLocal;

module.exports = model("Local", schema);
