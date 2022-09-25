const express = require("express");
const router = express.Router();
const {
  registerSalesMan,
  loginSalesMan,
  createSalesmanLocation,
} = require("../controller/salesmanController");

router.post("/register", registerSalesMan);
router.post("/login", loginSalesMan);
router.post("/create-location", createSalesmanLocation);

module.exports = router;
