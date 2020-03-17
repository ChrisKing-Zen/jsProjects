var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("index");
});
router.get("/cool", function(req, res, next) {
  res.render("youreso", { title: "cool" });
});

module.exports = router;
