const asyncHandler = require("express-async-handler");
const Entry = require("../models/entryModel");
const Exit = require("../models/exitModel");
const Attendance = require("../models/attendanceModel");

const createExit = asyncHandler(async (req, res) => {
  const { date_time, location, user } = req.body;
  console.log("exit", location);
  // const loc = JSON.parse(location);
  // console.log({ date_time, location, salesman, user });

  const entry1 = await Entry.find({ salesman: user.id })
    .sort({ _id: -1 })
    .limit(1);

  const entry = entry1[0];

  const exit = await Exit.create({
    entry: entry._id,
    date_time,
    salesman: user.id,
    location: {
      type: "Point",
      coordinates: [location.longitude, location.latitude],
    },
  });
  //find working hours

  const x1 = entry.date_time.getTime();

  const hours =
    Math.abs(entry.date_time.getTime() - exit.date_time.getTime()) / 36e5;
  // console.log(hours);
  const date = new Date();
  // console.log(date.getDate());
  // find Date

  if (exit) {
    const attendance = await Attendance.create({
      working_hours: hours,
      Date: date,
      salesman: user.id,
      Entry: entry.date_time,
      Exit: exit.date_time,
    });

    res.json({ entry, exit, attendance });
  }
});

module.exports = createExit;
