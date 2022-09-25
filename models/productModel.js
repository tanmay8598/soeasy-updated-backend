const mongoose = require("mongoose");

// @ts-ignore
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    retailer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Retailer",
    },
  },
  {
    timestamps: true,
  }
);

// @ts-ignore
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
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
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    sale_price: {
      type: Number,
      required: true,
      default: 0,
    },
    // countInStock: {
    //   type: Number,
    //   required: true,
    //   default: 0,
    // },
    size: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
