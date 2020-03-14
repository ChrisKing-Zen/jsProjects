const path = require("path");
const express = require("express");
const app = express();
const PORT = 4000;
const pathParse = file => {
  return path.join(__dirname + `/pages/${file}.html`);
};

app.get("/", (req, res) => {
  res.sendFile(pathParse("index"));
});
app.get("/about", (req, res) => {
  res.sendFile(pathParse("about"));
});
app.get("/contact", (req, res) => {
  res.sendFile(pathParse("contact-me"));
});

app.listen(PORT);
