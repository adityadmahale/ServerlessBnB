const express = require("express");
const { Room, validateRoom } = require("../models/room");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const rooms = await Room.scan().exec();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validateRoom(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const room = new Room({
      type: req.body.type,
      available: req.body.available,
      price: req.body.price,
    });
    await room.save();

    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

module.exports = router;
