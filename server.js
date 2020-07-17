"use strict";

var http = require("http"),
  express = require("express"),
  faye = require("faye");

var bayeux = new faye.NodeAdapter({
  mount: "/faye",
  timeout: 45,
});

var app = express();
var server = http.createServer(app);

bayeux.attach(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.post("/message", function (req, res) {
  bayeux.getClient().publish("/channel", { text: req.body.message });
});

var port = 8000;
server.listen(port);
console.log("Server up and listening on port " + port);
