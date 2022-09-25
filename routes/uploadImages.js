const path = require("path");
const express = require("express");
const multer = require("multer");
const { dirname } = require("path");
const router = express.Router();
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const fs = require("fs");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}

const upload = multer({ dest: "uploads/" });

router.post("/uploadImage", upload.single("image"), async (req, res) => {
  const file = req.file;

  const result = await uploadFile(file);
  res.send(`${result.Location}`);
  // res.send(file?.destination + file?.filename + ".jpeg");
});

module.exports = router;
