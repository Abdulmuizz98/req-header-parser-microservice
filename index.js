// index.js
// where your node app starts

// init project
require("dotenv").config();
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

const parseHeader = (req, res, next) => {
  const { ip: ipaddress } = req;
  const { "user-agent": software, "accept-language": language } = req.headers;

  // console.log(ipaddress, "-> ", software, "-> ", language);
  req.parsedHeader = { ipaddress, language, software };
  next();
};
// {"ipaddress":"::ffff:159.20.14.100","language":"en-US,en;q=0.5",
// "software":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0"}
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/whoami", parseHeader, (req, res) => {
  res.json(req.parsedHeader);
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
