const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    // countInStock,
    size,
  } = req.body;
  const product = await Product.create({
    name,
    price,
    description,
    image,
    brand,
    category,
    // countInStock,
    size,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.body.id);

  const f1 = product.image;
  const fileName = f1.split("//")[1].split("/")[1];

  var params = { Bucket: "soeasy-s3-bucket", Key: fileName };

  s3.deleteObject(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log("Image deleted successfully");
  });

  if (product) {
    await product.remove();
    res.status(201).json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const getProducts = asyncHandler(async (req, res) => {
  console.log("object");
  const products = await Product.find({});

  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.query.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.retailer.toString() === req.retailer._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.retailer.name,
      rating: Number(rating),
      comment,
      retailer: req.retailer._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createSaleByCategory = asyncHandler(async (req, res) => {
  const salePercent = req.body; // in b/w 0 and 1
  const products = await Product.find({ category: category });
  var updatedProducts = [];

  //   if (products) {
  //     products.forEach(product => {
  //       product.sale_price = price - (salePercent*price)
  //       updatedProducts = await product.save()
  //     })

  //     res.json(updatedProduct)
  //   } else {
  //     res.status(404)
  //     throw new Error('Product not found')
  //   }
  // })

  //

  if (products) {
    products.forEach((product) => {
      let id = product._id;
      let salePrice = product.price - salePercent * product.price;
      Product.findOneAndUpdate({ id: id }, { sale_price: salePrice });
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createSaleByProduct = asyncHandler(async (req, res) => {
  const price = req.body; // need to check how to send
  const product = await Product.findById(req.params.id);

  if (product) {
    product.sale_price = price;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

module.exports = {
  createProduct,
  createSaleByCategory,
  deleteProduct,
  getProducts,
  getProductById,
  createProductReview,
  createSaleByProduct,
};
