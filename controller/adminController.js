const asyncHandler = require("express-async-handler");
const generateTokenAdmin = require("../utils/generateTokenAdmin");
const Order = require("../models/orderModel");
const Retailer = require("../models/retailerModel");
const Attendance = require("../models/attendanceModel");
const SalesMan = require("../models/salesmanModel");
const endOfDay = require("date-fns/endOfDay");
const startOfDay = require("date-fns/startOfDay");
const startOfMonth = require("date-fns/startOfMonth");
const endOfMonth = require("date-fns/endOfMonth");
const Admin = require("../models/adminModel");
const { parseISO } = require("date-fns");
const salesmanLocation = require("../models/salesmanLoacationModel");
const { query } = require("express");

const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    res.status(400);
    throw new Error("User already exists!!");
  }
  const admin = await Admin.create({
    name,
    email,
    password,
    isAdmin: true,
  });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      isAdmin: admin.isAdmin,
      token: generateTokenAdmin(
        admin._id,
        admin.name,
        admin.email,
        admin.isAdmin
      ),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      isAdmin: admin.isAdmin,
      token: generateTokenAdmin(
        admin._id,
        admin.name,
        admin.email,
        admin.isAdmin
      ),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const salesMan = asyncHandler(async (req, res) => {
  const pageSize = 30;
  const page = Number(req.query.pageNumber) || 1;
  const salesman = await SalesMan.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json(salesman);
});
//
const salesmanById = asyncHandler(async (req, res) => {
  const salesman = await SalesMan.findById(req.query.id);

  if (salesman) {
    res.json(salesman);
  } else {
    res.status(404);
    throw new Error("Salesman not found");
  }
});
const attendanceOfSalesMan = asyncHandler(async (req, res) => {
  const salesManId = req.query.id;
  const pageSize = 15;
  const page = Number(req.query.pageNumber) || 1;

  const attendance = await Attendance.find({ salesman: salesManId })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  if (attendance) {
    res.json(attendance);
  } else {
    res.status(404);
    throw new Error("Salesman not found");
  }
});
const getSalesmanByRetailer = asyncHandler(async (req, res) => {
  const retailerId = req.query.id;
  const salesman = await SalesMan.find({ retailer: retailerId });

  if (salesman) {
    res.json(salesman);
  } else {
    res.status(404);
    throw new Error("No Salesman found");
  }
});

//

const getRetailer = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const retailer = await Retailer.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json(retailer);
});

const getRetailerById = asyncHandler(async (req, res) => {
  const retailer = await Retailer.findById(req.params.id);

  if (retailer) {
    res.json(retailer);
  } else {
    res.status(404);
    throw new Error("retailer not found");
  }
});
const getmonthlySales = asyncHandler(async (req, res) => {
  const date = req.query.date;
  const pageSize = 30;
  const page = Number(req.query.pageNumber) || 1;
  const d1 = parseISO(date);

  const monthlySales = await Order.find({
    createdAt: {
      $gte: startOfMonth(d1),
      $lte: endOfMonth(d1),
    },
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json(monthlySales);
});
const getSalesForDateRange = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;
  const s1 = parseISO(startDate);
  const s2 = parseISO(endDate);
  const pageSize = 30;
  const page = Number(req.query.pageNumber) || 1;

  const orders = await Order.find({
    createdAt: {
      $gte: startOfDay(s1),
      $lte: endOfDay(s2),
    },
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json(orders);
});

const getSalesmanLocation = asyncHandler(async (req, res) => {
  // const { user } = req.body;
  const salesmanlocation = await salesmanLocation.find({
    salesman: req.query.id,
  });
  res.json(salesmanlocation);
});

const unappointedSalesman = asyncHandler(async (req, res) => {
  const salesman = await SalesMan.find({
    isAppointed: false,
  });
  res.json(salesman);
});
const appointSalesman = asyncHandler(async (req, res) => {
  const Id = req.body.id;
  // console.log(Id)
  const salesman = await SalesMan.findById(Id);
  if (salesman) {
    salesman.isAppointed = true;
    const updatedsalesman = await salesman.save();
    res.status(201).json(updatedsalesman);
  }
});

const unappointedRetailer = asyncHandler(async (req, res) => {
  const retailer = await Retailer.find({ isAppointed: false });
  res.json(retailer);
});

const appointRetailer = asyncHandler(async (req, res) => {
  const Id = req.body.id;
  const retailer = await Retailer.findById(Id);
  if (retailer) {
    retailer.isAppointed = true;
    const updatedRetailer = await retailer.save();
    res.status(201).json(updatedRetailer);
  }
});

module.exports = {
  salesMan,
  salesmanById,
  getSalesmanByRetailer,
  attendanceOfSalesMan,
  getRetailer,
  getRetailerById,
  getmonthlySales,
  getSalesForDateRange,
  loginAdmin,
  registerAdmin,
  getSalesmanLocation,
  appointSalesman,
  unappointedSalesman,
  unappointedRetailer,
  appointRetailer,
};
