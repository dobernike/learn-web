/**Маршрутизация в Express */

// var express = require("express");
// var app = express();
// app.get("/", function(req, res) {
//   res.send("This is home");
// });
// app.get("/news", function(req, res) {
//   res.send("This is news");
// });
// app.get("/news/:id", function(req, res) {
//   res.send("ID is - " + req.params.id);
// });
// app.listen(1337);

/**Использование шаблонизатора */

// var express = require("express");
// var app = express();
// app.set("view engine", "ejs");
// app.get("/", function(req, res) {
//   res.sendFile(__dirname + "/index.html");
// });
// app.get("/about", function(req, res) {
//   res.sendFile(__dirname +"about.html");
// });
// app.get("/404", function(req, res) {
//   res.sendFile(__dirname +"404.html");
// });
// app.get("/news/:id", function(req, res) {
//   var obj = { title: "News", id: 4, paragraphs: [14, 235, 64, 23, "os"] };
//   res.render("news", { newsId: req.params.id, newParam: 125, obj: obj });
// });
// app.listen(1337);

/**Статические файлы и промежуточное ПО */

// var express = require("express");
// var bodyParser = require("body-parser");
// var app = express();
// var urlencodedParser = bodyParser.urlencoded({ extended: false });
// app.set("view engine", "ejs");
// app.use("/Node.js", express.static("Node.js"));
// app.get("/", function(req, res) {
//   res.render("index");
// });
// app.get("/about", function(req, res) {
//   res.render("about");
// });
// app.post("/about", urlencodedParser, function(req, res) {
//   if (!req.body) return res.sendStatus(400);
//   console.log(req.body);
//   res.render("about-success");
// });
// app.get("/404", function(req, res) {
//   res.render("404");
// });
// app.get("/news/:id", function(req, res) {
//   var obj = { title: "News", id: 4, paragraphs: [14, 235, 64, 23, "os"] };
//   res.render("news", { newsId: req.params.id, newParam: 125, obj: obj });
// });
// app.listen(1337);

/**данные из URL */

var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set("view engine", "ejs");
app.use("/Node.js", express.static("Node.js"));
app.get("/", function(req, res) {
  res.render("index");
});
app.get("/about", function(req, res) {
  res.render("about");
});
app.post("/about", urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);
  res.render("about-success");
});
app.get("/404", function(req, res) {
  res.render("404");
});

app.get("/news/:id", function(req, res) {
  var obj = { title: "News", id: 4, paragraphs: [14, 235, 64, 23, "os"] };
  console.log(req.query);
  res.render("news", { newsId: req.params.id, newParam: 125, obj: obj });
});
app.listen(1337);
