const mongoose = require("mongoose");

const primarystockSchema = mongoose.Schema(
  {
    inStock: {
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

const PrimaryStock = mongoose.model("PrimaryStock", primarystockSchema);

module.exports = PrimaryStock;
