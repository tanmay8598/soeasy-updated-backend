const express = require("express");
const router = express.Router();
const createEntry = require("../controller/entryController");
const createExit = require("../controller/exitController");
const { salesman } = require("../middleware/auth");

router.post("/create-entry", salesman, createEntry);
router.post("/create-exit", createExit);

module.exports = router;
