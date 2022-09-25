const mongoose = require("mongoose");

const salesmanLocationSchema = mongoose.Schema(
  {
    
    location: {
      type: { type: String, default: "Point" },
      coordinates: { type: [Number], index: "2dsphere" },
    },
    salesman: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "SalesMan",
    },
  },
  {
    timestamps: true,
  }
);

const salesmanLocation = mongoose.model("salesmanLocation", salesmanLocationSchema);

module.exports = salesmanLocation;
