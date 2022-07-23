/**
 * Author: Udit Gandhi
 * DAL ID: B00889579
 * Email: udit.gandhi@dal.ca
 */
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
var indexRouter = require("./routes/index");

var app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.listen(80, () => {
  console.log("Listening on port 80.");
});

module.exports = app;
