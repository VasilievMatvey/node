import express from "express";

const app = express();
const port = "3000";

app.get("/as", function (req, res) {
  res.end("Hello!!!");
});

app.listen(port, () => {
  console.log(`listen on port ${port}`);
});
