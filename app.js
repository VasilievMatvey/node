const express = require("express");
const favicon = require("express-favicon");
const fs = require("fs");
const path = require("path");

const app = express();
const port = "3000";

app.use(express.static(path.join(__dirname, "public")));

app.use(favicon(__dirname + "/public/favicon.ico"));
app.get("/test", (req, res) => {
  console.log("Прошли по пути /test");
  res.end("/test");
});
console.log(__dirname + "/public/favicon.ico");
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`listen on port ${port}`);
});
