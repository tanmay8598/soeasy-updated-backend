const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const salesmanSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isSalesMan: {
      type: Boolean,
      required: true,
      default: true,
    },
    isAppointed: {
      type: Boolean,
      required: true,
      default: false,
    },
    retailer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "SalesMan",
    },
    pushToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

salesmanSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

salesmanSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const SalesMan = mongoose.model("SalesMan", salesmanSchema);

module.exports = SalesMan;
