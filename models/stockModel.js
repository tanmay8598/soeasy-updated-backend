const mongoose = require("mongoose");

const stockSchema = mongoose.Schema(
  {
    inStock: {
      type: Number,
      required: true,
    },
    retailer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Retailer",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
