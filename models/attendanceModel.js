const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema(
  {
    working_hours: {
      type: String,
      required: true,
    },
    Date: {
      type: Date,
      required: true,
    },
    Entry: {
      type: Date,
      required: true,
    },
    Exit: {
      type: Date,
      required: true,
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

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
