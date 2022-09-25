const asyncHandler = require("express-async-handler");
const Stock = require("../models/stockModel");

const addStock = asyncHandler(async (req, res) => {
  const { retailer, product, qty } = req.body;

  const addStock = Number(qty);
  const stockExists = await Stock.findOne({
    $and: [{ product: product }, { retailer: retailer }],
  });

  if (stockExists) {
    stockExists.inStock = stockExists.inStock + addStock;
    const updatedStock = await stockExists.save();
    res.json(updatedStock);
  } else {
    const stock = await Stock.create({ retailer, product, inStock: addStock });
    res.json(stock);
  }
});

const deleteStock = asyncHandler(async (req, res) => {
  const { retailer, product, qty } = req.body;
  const delStock = Number(qty);

  const stockExists = await Stock.findOne({
    $and: [{ product: product }, { retailer: retailer }],
  });
  if (stockExists) {
    stockExists.inStock = stockExists.inStock - delStock;
    const updatedStock = await stockExists.save();
    res.json(updatedStock);
  }
});

const getmyStock = asyncHandler(async (req, res) => {
  const retailer = req.query.retailer;
  const stockExists = await Stock.find({ retailer: retailer }).populate(
    "product",
    "name"
  );
  res.json(stockExists);
});

const getmyStockByProduct = asyncHandler(async (req, res) => {
  const retailer = req.query.retailer;
  const product = req.query.product;

  const stockExists = await Stock.findOne({
    $and: [{ product: product }, { retailer: retailer }],
  });

  res.json(stockExists);
});

module.exports = { getmyStock, deleteStock, addStock, getmyStockByProduct };
