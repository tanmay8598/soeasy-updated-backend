const mongoose = require("mongoose");

const exitSchema = mongoose.Schema(
  {
    entry: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Entry",
    },
    date_time: {
      type: Date,
    },
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

const Exit = mongoose.model("Exit", exitSchema);

module.exports = Exit;
