const express = require("express");
const { Booking, validate } = require("../models/booking");
const { Room } = require("../models/room");

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.get({ customerID: req.params.id });
    if (!booking) return res.status(404).json(`The booking was not found.`);

    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const room = await Room.get({ type: req.body.type });
    if (!room) return res.status(404).json(`The room type was not found.`);

    if (room.available == 0)
      return res.status(400).json(`The room type is fully booked.`);
    else {
      room.available = room.available - 1;
    }

    await room.save();

    const booking = new Booking({
      customerID: req.body.customerID,
      type: req.body.type,
      active: true,
    });
    await booking.save();

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

module.exports = router;
