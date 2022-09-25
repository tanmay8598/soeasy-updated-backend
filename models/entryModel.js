const mongoose = require("mongoose");

const entrySchema = mongoose.Schema(
  {
    date_time: {
      type: Date,
      required: true,
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

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;
