const path = require("path");
const fs = require("fs");
// console.log("Название файла", path.basename(__filename));
// console.log("Название каталога", path.basename(__dirname));
// console.log("расширение", path.extname(__filename));

// fs.mkdir(path.join(__dirname, "tmp"), function (err) {
//   if (err) console.error(err);
//   console.log("папка создана");
// });

const filePath = path.join(__dirname, "tmp", "2.txt");
// fs.writeFile(filePath, "олрларлоав", function (err) {
//   if (err) console.error(err);
//   console.log("файл создан");
// });
console.log(filePath);
fs.appendFile(filePath, "\nЕщ", function (err) {
  if (err) console.error(err);
  console.log("файл переписан");
});

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) console.error(err);
  console.log(data);
});
