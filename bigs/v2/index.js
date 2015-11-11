var chance = require('chance');
var moment = require('moment');

var Firebase = require("firebase");

/*var inputFirebaseRef = new Firebase("https://3mbigs.firebaseio.com/inputs");
var outcomeFirebaseRef = new Firebase("https://3mbigs.firebaseio.com/outcomes");
*/

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

var inputFirebaseRef = new Firebase("https://3mbigs.firebaseio.com/inputs");

app.get('/api/mergeData', function(req, res) {

/*
	var tableData = JSON.parse(fs.readFileSync('newtable.json', 'utf8'));
	var newFilename = moment().format("X") + '.json';
	fs.writeFileSync(newFilename, JSON.stringify(tableData, null, 2), 'utf-8');

	var tableDataArrary = tableData["data"];
	var ticketIndexArrary = {};
	for (var i = 0; i < tableDataArrary.length; i++) {
		var ticketItem = tableDataArrary[i];
		ticketIndexArrary[ticketItem["Ticket Number"]] = i;
	}

	var matlabInput = [];
	var counts = 0;

	inputFirebaseRef.once("value", function(snapshot) {
		snapshot.forEach(function(data) {
			var assetItem = data.val();
			var ticketNumber = assetItem["ticketID"];
			index = ticketIndexArrary[ticketNumber];
			if (index != null) {

				var ticketData = tableDataArrary[index];
				ticketData['Human Priority'] = assetItem['queueID'];
				ticketData['Candidate Actions'] = assetItem['actionID'];

				var matlabInputItem = {};
				matlabInputItem['Ticket Number'] = ticketData['Ticket Number'];
				matlabInputItem['Ticket Type/Priority/Category'] = ticketData['Ticket Type/Priority/Category'];
				matlabInputItem['Risk Group'] = ticketData['Risk Group'];
				matlabInputItem['Human Priority'] = ticketData['Human Priority'];
				matlabInputItem['Candidate Actions'] = ticketData['Candidate Actions'];
				matlabInput.push(matlabInputItem);

				counts++;

			} else {
				console.log("can't find ticket number:", ticketNumber);
			}


		});

		fs.writeFileSync('newMatlabInput.json', JSON.stringify(matlabInput, null, 2), 'utf-8');
		console.log(matlabInput);
		fs.writeFileSync('newtable1.json', JSON.stringify(tableData, null, 2), 'utf-8');



	}, function(err) {
		console.log("error retrieving input list!");
	});

	console.log("mergeData called!");
	res.json({
		"counts": tableDataArrary.length
	}); */
	res.json({success: true});
});



var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Bigs app listening at http://%s:%s', host, port);
});