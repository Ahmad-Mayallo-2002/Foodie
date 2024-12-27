const { Types, model } = require("mongoose");
const { Schema } = require("mongoose");

const orderSchema = new Schema(
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
          min: 1,
          default: 1,
          required: true,
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
    totalPrice: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["pending", "shipping", "cancelled", "delivered"],
      default: "pending",
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Credit Card", "Paypal"],
      required: true,
    },
    creditCardDetails: {
      cardNumber: {
        type: String,
        required: function () {
          return this.paymentMethod === "credit cart";
        },
      },
      cardExpiry: {
        type: String,
        required: function () {
          return this.paymentMethod === "credit cart";
        },
      },
      cardCVV: {
        type: String,
        required: function () {
          return this.paymentMethod === "credit cart";
        },
      },
      cardHolderName: {
        type: String,
        required: function () {
          return this.paymentMethod === "credit cart";
        },
      },
    },
    paypalDetails: {
      payerId: {
        type: String,
        required: function () {
          return this.paymentMethod === "paypal";
        },
      },
      paymentId: {
        type: String,
        required: function () {
          return this.paymentMethod === "payapl";
        },
      },
      payerEmail: {
        type: String,
        required: function () {
          return this.paymentMethod === "paypal";
        },
      },
    },
  },
  { collection: "Order", timestamps: true }
);

const Order = model("Order", orderSchema);

module.exports.Order = Order;
