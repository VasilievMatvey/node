const express = require("express");
const favicon = require("express-favicon");
const fs = require("fs");
const path = require("path");

const app = express();
const port = "3000";

const routeTest = "/test";
const routeSlash = "/";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(__dirname + "/public/favicon.ico"));
const filePath = path.join(__dirname, "tmp", "1.txt");
fs.writeFile(filePath, "", (err) => {
  if (err) console.error(err);
  console.log("файл создан");
});
app.get(routeTest, (req, res) => {
  fs.appendFile(
    filePath,
    `\nЛогируем ping по адресу localhost:${port}${routeTest}. Время: ${new Date()}`,
    (err) => {
      if (err) console.error(err);
      console.log("файл переписан");
    }
  );
  res.end("/test");
});
app.post(routeTest, (req, res) => {
  console.log("Прошли по пути post/test");
  fs.appendFile(
    filePath,
    `\nЛогируем ping по адресу localhost:${port}${routeTest}. Время: ${new Date()}`,
    (err) => {
      if (err) console.error(err);
      console.log("файл переписан");
    }
  );
  res.end("post/test");
});
console.log(__dirname + "/public/favicon.ico");
app.get(routeSlash, function (req, res) {
  res.end(
    fs.appendFile(
      filePath,
      `\nЛогируем ping по адресу localhost:${port}${routeSlash}. Время: ${new Date()}`,
      (err) => {
        if (err) console.error(err);
        console.log("файл переписан");
      }
    )
  );
});
app.post(routeSlash, function (req, res) {
  fs.appendFile(
    filePath,
    `\nЛогируем ping по адресу localhost:${port}${routeSlash}. Время: ${new Date()}`,
    (err) => {
      if (err) console.error(err);
      console.log("файл переписан");
    }
  );
});

app.listen(port, () => {
  console.log(`listen on port ${port}`);
});
