const { model, Schema } = require("mongoose");

const orderSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      min: 1,
      required: true,
    },
    amount: {
      type: Number,
    },
  },
  { versionKey: false }
);

module.exports = model("Order", orderSchema);
