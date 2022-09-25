const mongoose = require("mongoose");

const stockExitSchema = mongoose.Schema(
  {
    stockOut: {
      type: Number,
      required: true,
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

const StockExit = mongoose.model("StockExit", stockExitSchema);

module.exports = StockExit;
