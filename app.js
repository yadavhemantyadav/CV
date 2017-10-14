//require('newrelic');
var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');
var app = express();
var fs = require("fs");
var mysql = require('mysql');
var dateTime = require('node-datetime');

var cors = require('cors');
 
app.use(cors());

// var bodyParser = require("body-parser");

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// var db_config = {
//     host: "ec2-13-59-131-1.us-east-2.compute.amazonaws.com",
//     user: "hemant",
//     password: "abc@abc",
//     database: "kd"
// };

var mysql_pool  = mysql.createPool({
  connectionLimit : 100,
  host            : 'ec2-18-221-173-255.us-east-2.compute.amazonaws.com',
  user            : 'hemant',
  password        : 'abc@abc',
  database        : 'kd'
});


// function handleDisconnect() {
// 	console.log('handleDisconnect()');
// 	connection.destroy();
// 	connection = mysql.createConnection(db_config);
// 	connection.connect(function(err) {
// 	    if(err) {
// 			console.log(' Error when connecting to db  (DBERR001):', err);
// 			setTimeout(handleDisconnect, 1000);
// 	    }
// 	});

// }

// var connection = mysql.createConnection(db_config);

app.use(express.static(__dirname + '/public/'));

console.log("starting");
var port = process.env.PORT || 5000;
process.env.PWD = process.cwd();

var compression = require('compression');
app.use(compression());

app.use(express.static(process.env.PWD));

app.get('/timeTable',function(request,response,next){
	var dt = dateTime.create();
	var formatted = dt.format('d.m.Y');
	console.log(formatted);

	var query = "select * from TimeTableDetails where dates = '" + formatted + "'";
	//var query = "select * from TimeTableDetails";

	console.log(formatted);

	mysql_pool.getConnection(function(err, connection) {
		if (err) {
			connection.release();
	  		console.log(' Error getting mysql_pool connection: ' + err);
	  		throw err;
	  	}
	    connection.query(query, function(err2, rows) {	
	    	if (err2) {
	    		console.log("error in query");
				var data = { "Time":"", "DatabaseStatus":"" };
				data["Time"] = (new Date()).getTime();
				data["DatabaseStatus"] = "Down";
				data["error_code"] = "0";
				response.json(data); 
			} else {
				console.log(rows);
				data = {};
				arraydata = {};
				for(var i=0; i<rows.length; i++){
					data[i] = rows[i];
				}
				console.log(data);
				res={};
				res.table = data;
				res.message = 1;
				if(rows.length==0){
					res.message = 0;	
				}
				res.error_code = "1";
				
				console.log(res);
				response.json(res);
			}
			console.log(' mysql_pool.release()');
			connection.release();
	    });
	});
});

// app.get("/", function(request, response,next) {
    
// });

app.get('*', function (req, res) {
    console.log(req.params);
    //    var response = {};
    //    response["message"] = "invalid url";
    //    response["error_code"] = 1;
    //    res.end(JSON.stringify(response));
    res.sendFile(__dirname + '/index.html');
});


// for preventing dyno to sleeping  in every 3 minutes (180000)
// setInterval(function() {
//     http.get("http://sonukr.herokuapp.com");
// }, 180000);

app.listen(port);
