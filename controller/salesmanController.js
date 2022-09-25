const asyncHandler = require("express-async-handler");
const salesmanLocation = require("../models/salesmanLoacationModel");
const SalesMan = require("../models/salesmanModel");
const generateToken = require("../utils/generateToken");

const registerSalesMan = asyncHandler(async (req, res) => {
  const { name, email, password, mobile, retailer } = req.body;

  const salesmanExists = await SalesMan.findOne({ email });

  if (salesmanExists) {
    res.status(400);
    throw new Error("User already exists!!");
  }
  const salesman = await SalesMan.create({
    name,
    email,
    password,
    mobile,
    isSalesMan: true,
    isAppointed: false,
    retailer,
  });

  if (salesman && salesman.isAppointed == true) {
    res.status(201).json({
      _id: salesman._id,
      name: salesman.name,
      email: salesman.email,
      isSalesMan: salesman.isSalesMan,
      isAppointed: salesman.isAppointed,
      mobile: salesman.mobile,
      token: generateToken(
        salesman._id,
        salesman.name,
        salesman.email,
        salesman.isSalesMan,
        salesman.isAppointed
      ),
    });
  } else {
    res.status(400);
    throw new Error("salesman not appointed yet!");
  }
});

const loginSalesMan = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const salesman = await SalesMan.findOne({ email });

  if (
    salesman &&
    salesman.isAppointed == true &&
    (await salesman.matchPassword(password))
  ) {
    res.json({
      _id: salesman._id,
      name: salesman.name,
      email: salesman.email,
      isSalesMan: salesman.isSalesMan,
      token: generateToken(
        salesman._id,
        salesman.name,
        salesman.email,
        salesman.isSalesMan,
        salesman.isAppointed
      ),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email/Password or appointment not confirm yet");
  }
});

const createSalesmanLocation = asyncHandler(async (req, res) => {
  const { location, user } = req.body;
  const saleslocationExist = await salesmanLocation.find({ salesman: user.id });
  const abc = saleslocationExist[0];
  if (abc) {
    abc.location = {
      type: "Point",
      coordinates: [location.longitude, location.latitude],
    };
    const salesmanlocation = await abc.save();
    res.json({ salesmanlocation });
  } else {
    const salesmanlocation = await salesmanLocation.create({
      salesman: user.id,
      location: {
        type: "Point",
        coordinates: [location.longitude, location.latitude],
      },
    });
    res.json({ salesmanlocation });
  }
});

module.exports = { registerSalesMan, loginSalesMan, createSalesmanLocation };
