const { Schema, model } = require("mongoose");

const schema = Schema(
  {
    name: {
      type: String,
      // required: false,
    },
    description: {
      type: String,
      // required: false,
    },
    image: {
      type: String,
      // required: false,
    },
    price: {
      type: Number,
      // required: false,
    },
    type: [
      {
        type: String,
        // required: false,
      },
    ],
    local: {
      type: Schema.Types.ObjectId,
      ref: "local",
      // required: true
    },
  },
  { collection: "products" }
);

function addProduct(productInfo, localId) {
  // console.log(localId);
  if (!productInfo.name) throw new Error("name is required");
  productInfo.local = localId;
  const product = new this(productInfo);
  return product.save();
}

schema.statics.addProduct = addProduct;

module.exports = model("Product", schema);
