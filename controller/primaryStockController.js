const asyncHandler = require("express-async-handler");
const PrimaryStock = require("../models/primaryStockModel");
const StockEntry = require("../models/stockEntryModel");
const StockExit = require("../models/stockExitModel");

const addStock = asyncHandler(async (req, res) => {
  const { product, addStock } = req.body;

  const stockExists = await PrimaryStock.findOne({
    product: product,
  });

  if (stockExists) {
    stockExists.inStock = stockExists.inStock + Number(addStock);
    const updatedStock = await stockExists.save();
    const stock = await StockEntry.create({ product, stockIn: addStock });
    res.status(201).json(updatedStock);
  } else {
    const stock = await PrimaryStock.create({ product, inStock: addStock });
    res.status(201).json(stock);
  }
});

const delStock = asyncHandler(async (req, res) => {
  const { product, delStock } = req.body;

  const stockExists = await PrimaryStock.findOne({
    product: product,
  });
  if (stockExists) {
    stockExists.inStock = stockExists.inStock - delStock;
    const updatedStock = await stockExists.save();
    const stock = await StockExit.create({ product, stockOut: delStock });
    res.status(201).json(updatedStock);
  }
});
const delStockInvoice = asyncHandler(async (req, res) => {
  const { products } = req.body;
 const product = JSON.parse(products)
 console.log(product)

 const len = product.length
 for (i = 0; i<len; i++){
  const stockExists = await PrimaryStock.findOne({
    product: product[i].productId,
  });
  if (stockExists) {
    stockExists.inStock = stockExists.inStock - product[i].quantity;
    const updatedStock = await stockExists.save();
    const stock = await StockExit.create({ product: product[i].productId, stockOut: product[i].quantity });
  }
 }
});

const getPrimaryStock = asyncHandler(async (req, res) => {
  const stockExists = await PrimaryStock.find({}).populate(
    "product",
    "name image"
  );
  res.json(stockExists);
});

const getPrimaryStockByProduct = asyncHandler(async (req, res) => {
  const product = req.query.product;
  const stockExists = await PrimaryStock.find({ product: product }).populate(
    "product",
    "name image"
  );
  res.json(stockExists);
});

const getStockIn = asyncHandler(async (req, res) => {
  const pageSize = 15;
  const page = Number(req.query.pageNumber) || 1;
  const stockIn = await StockEntry.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate("product", "name image");
  res.json(stockIn);
});
const getStockOut = asyncHandler(async (req, res) => {
  const pageSize = 15;
  const page = Number(req.query.pageNumber) || 1;
  const stockOut = await StockExit.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate("product", "name image");
  res.json(stockOut);
});

module.exports = {
  getPrimaryStock,
  getPrimaryStockByProduct,
  addStock,
  delStock,
  delStockInvoice,
  getStockIn,
  getStockOut,
};
