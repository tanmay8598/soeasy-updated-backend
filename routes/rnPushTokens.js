const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const SalesMan = require("../models/salesmanModel");

router.post("/register-token", async (req, res) => {
  console.log(req.body.token);
  const user = await SalesMan.findById(req.body.user._id);
  // console.log(user);

  if (!user) return res.status(400).send({ error: "Invalid user." });
  user.pushToken = req.body.token;
  const updatedUser = await user.save();

  res.status(201).send();
});
module.exports = router;
