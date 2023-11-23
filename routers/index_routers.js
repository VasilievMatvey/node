const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.end("/");
});
router.post("/", function (req, res) {
  res.end("/");
});

router.get("/register", function (req, res) {
  res.render("register.ejs");
});
router.post("/register", function (req, res) {});

router.get("/login", function (req, res) {
  res.render("login.ejs");
});
router.post("/login", function (req, res) {});

router.get("/test", function (req, res) {
  res.end("/test");
});
router.post("/test", function (req, res) {
  console.log("Прошли по пути post/test");
  res.end("post/test");
});

module.exports = router;
