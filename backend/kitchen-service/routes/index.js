var express = require("express");
var router = express.Router();
const { placeOrder, getOrdersByCustomer } = require("../controllers/Order");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/placeorder", placeOrder);
router.get("/getOrdersByCustomer", getOrdersByCustomer);

module.exports = router;
