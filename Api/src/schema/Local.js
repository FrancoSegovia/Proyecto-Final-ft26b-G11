const { Schema, model } = require("mongoose");

const schema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      // required: true,
    },
    category: {
      type: String,
      // required: true,
    },
    schedule: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    image: {
      type: String,
      // required: true,
    },
    owner: {
      type: Schema.ObjectId,
      ref: "owner",
    },
  },
  { collection: "locals" }
);

function addLocal(localInfo, ownerId) {
  if (!localInfo.name) throw new Error("name is required");
  localInfo.owner = ownerId;
  const local = new this(localInfo);
  return local.save();
}

schema.statics.addLocal = addLocal;

module.exports = model("Local", schema);
