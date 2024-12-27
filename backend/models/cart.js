const { Schema, Types, model } = require("mongoose");

const cartSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: Types.ObjectId,
          ref: "Product",
          required: true,
        },
        amount: {
          type: Number,
          required: true,
          default: 1,
          min: 1,
        },
        size: {
          type: String,
          enum: ["sm", "md", "lg"],
          default: "md",
          required: true,
        },
        _id: false,
      },
    ],
  },
  { collection: "Cart", timestamps: true }
);

const Cart = model("Cart", cartSchema);

module.exports.Cart = Cart;
