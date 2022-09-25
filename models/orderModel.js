const mongoose = require("mongoose");

// @ts-ignore
const orderSchema = mongoose.Schema(
  {
    retailer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Retailer",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      // country: { type: String, required: true },
      mobileNumber: { type: Number, required: true },
      email: { type: String, required: true },
    },
    // taxPrice: {
    //   type: Number,
    //   required: true,
    //   default: 0.0,
    // },
    // shippingPrice: {
    //   type: Number,
    //   required: true,
    //   default: 0.0,
    // },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    // paymentMethod: {
    //   type: String,
    //   required: true,
    // },
    deliveryStatus: {
      type: String,
      required: true,
      default: "Placed",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
