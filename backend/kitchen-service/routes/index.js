/**
 * Author: Udit Gandhi
 * DAL ID: B00889579
 * Email: udit.gandhi@dal.ca
 */
var express = require("express");
var router = express.Router();
const {
  getFoodItems,
  placeOrder,
  getOrdersByCustomer,
  getOrders,
} = require("../controllers/Order");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/getFoodItems", getFoodItems);
router.post("/placeorder", placeOrder);
router.get("/getOrdersByCustomer", getOrdersByCustomer);
router.get("/getOrders", getOrders);

module.exports = router;
