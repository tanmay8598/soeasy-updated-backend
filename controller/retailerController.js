const asyncHandler = require("express-async-handler");
const Retailer = require("../models/retailerModel");
const generateToken = require("../utils/generateToken");
const Product = require("../models/productModel");
const Razorpay = require("razorpay");

const registerRetailer = asyncHandler(async (req, res) => {
  const { name, email, password, mobile } = req.body;

  const retailerExists = await Retailer.findOne({ email });

  if (retailerExists) {
    res.status(400);
    throw new Error("User already exists!!");
  }
  const retailer = await Retailer.create({
    name,
    email,
    password,
    mobile,
    isSalesMan: false,
    isAppointed: false,
  });

  if (retailer && retailer.isAppointed == true) {
    res.status(201).json({
      _id: retailer._id,
      name: retailer.name,
      email: retailer.email,
      isSalesMan: retailer.isSalesMan,
      mobile: retailer.mobile,
      isAppointed: retailer.isAppointed,
      token: generateToken(
        retailer._id,
        retailer.name,
        retailer.email,
        retailer.isSalesMan,
        retailer.isAppointed
      ),
    });
  } else {
    res.status(400);
    throw new Error("Vendor not appointed yet!");
  }
});

const loginRetailer = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const retailer = await Retailer.findOne({ email });

  if (
    retailer &&
    retailer.isAppointed == true &&
    (await retailer.matchPassword(password))
  ) {
    res.json({
      _id: retailer._id,
      name: retailer.name,
      email: retailer.email,
      isSalesMan: retailer.isSalesMan,
      token: generateToken(
        retailer._id,
        retailer.name,
        retailer.email,
        retailer.isSalesMan,
        retailer.isAppointed
      ),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email/Password or appointment not confirm yet");
  }
});

const payment = asyncHandler(async (req, res) => {
  const userdtls = JSON.parse(req.query.userDetails);
  const productdtls = JSON.parse(req.query.productDetails);
  // const product = await Product.findById(productdtls._id);
  const user = await Retailer.findById(userdtls.id);
  var total = 0;
 for(var i = 0; i < productdtls.length; i++){
    total += ((productdtls[i].price) * (productdtls[i].qty)) * 100;        
  }
 

  const instance = new Razorpay({
    key_id: process.env.RAZOR_PAY_ID,
    key_secret: process.env.RAZOR_PAY_SECRET,
  });
  const result = await instance.orders.create({
    amount: total,
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      userId: user.id,
      key: process.env.RAZOR_PAY_ID,
    },
  });

  res.json(result);
});

module.exports = { registerRetailer, loginRetailer, payment };
