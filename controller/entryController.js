const asyncHandler = require("express-async-handler");
const Entry = require("../models/entryModel");
const Exit = require("../models/exitModel");

const createEntry = asyncHandler(async (req, res) => {
  const { date_time, location, user } = req.body;
  console.log("entry", location);

  const entry = await Entry.create({
    date_time,
    salesman: user.id,
    location: {
      type: "Point",
      coordinates: [location.longitude, location.latitude],
    },
  });

  res.json(entry);
});

module.exports = createEntry;
