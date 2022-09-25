const express = require("express");
const router = express.Router();
const {
  createProduct,
  createSaleByCategory,
  deleteProduct,
  getProducts,
  getProductById,
  createProductReview,
  createSaleByProduct,
} = require("../controller/productController");

router.post("/create-product", createProduct);
router.post("/delete-product", deleteProduct);
router.get("/get-products", getProducts);
router.get("/getproduct-byid", getProductById);
module.exports = router;
