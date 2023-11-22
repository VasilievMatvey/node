const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  logger(port, routeTest);
  res.end("/test");
});
router.post("/", function (req, res) {});

router.get("/register", function (req, res) {});
router.post("/register", function (req, res) {});

// app.get(routeTest, (req, res) => {
//   logger(port, routeTest);
//   res.end("/test");
// });
// //   app.post(routeTest, (req, res) => {
//     console.log("Прошли по пути post/test");
//     logger(port, routeTest);
//     res.end("post/test");
//   });
//   console.log(__dirname + "/public/favicon.ico");
//   app.get(routeSlash, function (req, res) {
//     logger(port, routeSlash);
//     res.end();
//   });
//   app.get(routeSlash, function (req, res) {
//     logger(port, routeSlash);
//     res.end("/");
//   });
//   app.post(routeSlash, function (req, res) {
//     logger(port, routeSlash);
//     res.end("/");
//   });
// app.get("env") == "production";
// console.log(app.get("env"));
// if (app.get("env") == "production") {
//   app.use((req, res, err) => {
//     res.status(err.status);
//     res.sendFile(err.message);
//   });
// }
module.exports = router;
