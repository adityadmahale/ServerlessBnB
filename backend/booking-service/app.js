const express = require("express");
const bookings = require("./routes/bookings");
const rooms = require("./routes/rooms");
const checkout = require("./routes/checkout");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

// require("./startup/initializeDB")();

app.use("/bookings", bookings);
app.use("/rooms", rooms);
app.use("/checkout", checkout);

const port = process.env.PORT || 5000;

module.exports = app;
