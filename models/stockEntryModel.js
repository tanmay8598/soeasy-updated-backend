const mongoose = require("mongoose");

const stockEntrySchema = mongoose.Schema(
  {
    stockIn: {
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

const StockEntry = mongoose.model("StockEntry", stockEntrySchema);

module.exports = StockEntry;
