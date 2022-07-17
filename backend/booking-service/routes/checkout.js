const express = require("express");
const Joi = require("joi");
const { Room } = require("../models/room");
const { Booking } = require("../models/booking");

const router = express.Router();

const schema = Joi.object({
  type: Joi.string().required(),
  customerID: Joi.string().required(),
});

router.post("/", async (req, res) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const booking = await Booking.get({
      customerID: req.body.customerID,
      type: req.body.type,
    });
    if (!booking) return res.status(404).json(`The booking was not found.`);

    const room = await Room.get({ type: req.body.type });
    if (!room) return res.status(404).json(`The room type was not found.`);

    booking.active = false;
    await booking.save();

    room.available = room.available + 1;
    await room.save();

    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

module.exports = router;
