const { model, Schema } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { versionKey: false }
);

module.exports = model("Product", productSchema);
