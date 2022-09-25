const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetToken: String,
  expireToken: Date,
});

const InvoiceUser = mongoose.model("InvoiceUser", userSchema);

module.exports = InvoiceUser;
