const express = require("express");
const { addOrderItems, getMyOrders } = require("../controller/orderController");
const router = express.Router();
const {
  registerRetailer,
  loginRetailer,
  payment,
} = require("../controller/retailerController");
const {
  getmyStock,
  deleteStock,
  addStock,
  getmyStockByProduct,
} = require("../controller/stockController");

router.post("/register", registerRetailer);
router.post("/login", loginRetailer);

//stock
router.post("/addstock", addStock);
router.post("/delstock", deleteStock);
router.post("/createOrder", addOrderItems);
router.get("/getmystock", getmyStock);
router.get("/getmyorders", getMyOrders);
router.get("/getmystockbyproduct", getmyStockByProduct);
router.get("/payment", payment);

module.exports = router;
