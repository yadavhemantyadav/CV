//require('newrelic');
console.log("starting");
var port = process.env.PORT || 5000;
process.env.PWD = process.cwd();

var compression = require('compression');
var express = require("express");
var http = require("http");
var app = express();

app.use(compression());

app.use(express.static(process.env.PWD));

app.use(express.static(__dirname + '/public/'));

app.get("/", function(request, response) {
    response.send('Hey!!');

});

// for preventing dyno to sleeping  in every 3 minutes (180000)
// setInterval(function() {
//     http.get("http://sonukr.herokuapp.com");
// }, 180000);

app.listen(port);
