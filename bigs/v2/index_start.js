var chance = require('chance');
var moment = require('moment');

var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://3mbigs.firebaseio.com/");

/*
 inputFirebaseRef.push().set({
    ticketID: "alanisawesome",
    input1: "The Turing Machine"
  }); 

  outcomeFirebaseRef.push().set({
    ticketID: "alanisawesome",
    input1: "The Turing Machine"
  }); 

*/

myFirebaseRef.set({
    outcomes: "alanisawesome",
    inputs: "inputs",
    damages: "damages"
  }); 


var fs = require('fs');

var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/api/checkin', function(req, res) {

	var logItem = {
		'name': req.query.name,
		'timeStamp': moment().format(),
		'cabinetID': req.query.cabinetID,
		'action': 'check in',
		'text': chance().sentence({
			words: 4
		})
	};
	res.json(logItem);
});



var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Bigs app listening at http://%s:%s', host, port);
});



var data = JSON.parse(fs.readFileSync('logItems_saved.json', 'utf8'));

fs.writeFileSync('logItems_saved.json', JSON.stringify(data, null, 2), 'utf-8');