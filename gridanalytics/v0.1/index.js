var jsonServer = require('json-server');

// Express server
var server = jsonServer.create();

// Default middlewares (logger, public, cors)
server.use(jsonServer.defaults);

// Add other Express middlewares if needed (authentication, redirections, ...)

var chance = require('chance');
var moment = require('moment');

var XLSX = require('xlsx');

var express = require('express');
var bodyParser = require('body-parser');
server.use(bodyParser.json());

/*
var jsonFile = require('./data/db.json');

for (var i = 0; i < jsonFile.events.length; i++)
{
	var d1 = moment(jsonFile.events[i].Date, "M_DD");
	var date_time = d1.format('2015 MM/DD') + " at " + jsonFile.events[i].Time;
	jsonFile.events[i].dateTime = date_time;
}

server.get('/api/schema.json', function(req, res) {
	var jsonFile = require('./data/schema.json');
	res.status(200).json(jsonFile);

});



server.post('/api/config', function(req, res) {
	configJson = req.body;
	res.status(200).json(configJson);
});


require('fs').writeFileSync('data/cleaned.json', JSON.stringify(jsonFile, null, 2), 'utf-8'); */

server.use('/api', jsonServer.router('data/cleaned.json'));

/*
var workbook = XLSX.readFile('data/2row.xlsx');
var first_sheet_name = workbook.SheetNames[0];
var worksheet1 = workbook.Sheets[first_sheet_name];
var dataJson = XLSX.utils.sheet_to_json(worksheet1);
console.log(JSON.stringify(dataJson[0])); */


server.listen((process.env.PORT || 2000), function() {
	console.log("grid anaylitics server is up running at port 2000!");
});