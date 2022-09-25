const express = require("express");
const router = express.Router();
const {
  salesMan,
  salesmanById,
  getSalesmanByRetailer,
  attendanceOfSalesMan,
  getRetailer,
  getRetailerById,
  getmonthlySales,
  getSalesForDateRange,
  registerAdmin,
  loginAdmin,
  getSalesmanLocation,
  unappointedSalesman,
  appointSalesman,
  unappointedRetailer,
  appointRetailer,
} = require("../controller/adminController");
const {
  addStock,
  delStock,
  getPrimaryStock,
  getPrimaryStockByProduct,
  getStockIn,
  getStockOut,
  delStockInvoice,
} = require("../controller/primaryStockController");

//admin auth
router.post("/register", registerAdmin); //d
router.post("/login", loginAdmin); //d

//reports
router.get("/getsalesman", salesMan); //d
router.get("/getsalesmanbyid", salesmanById);
router.get("/getSalesmanbyRetailer", getSalesmanByRetailer); //d
router.get("/getattendanceofSalesMan", attendanceOfSalesMan); //d
router.get("/getretailers", getRetailer); //d
router.get("/getretailersbyid", getRetailerById);
router.get("/getmonthlysales", getmonthlySales); //d
router.get("/getsalesbydaterange", getSalesForDateRange); //d
router.get("/getsalesmanlocation", getSalesmanLocation); //d

//salesman
router.get("/getunappointedsalesman", unappointedSalesman); //d
router.post("/appointsalesman", appointSalesman); //d

//retailer
router.get("/getunappointedretailer", unappointedRetailer); //d
router.post("/appointretailer", appointRetailer); //d

//primary stock
router.post("/addprimarystock", addStock); //d
router.post("/delprimarystock", delStock); //d
router.get("/getprimarystock", getPrimaryStock); //d
router.get("/getprimarystockbyproduct", getPrimaryStockByProduct); //d
router.get("/getstockin", getStockIn); //d
router.get("/getstockout", getStockOut); //d
router.post("/delprimarystockinvoice", delStockInvoice); //d

module.exports = router;
