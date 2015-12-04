var chance = require('chance');
var moment = require('moment');

var Firebase = require("firebase");

/*var inputFirebaseRef = new Firebase("https://3mbigs.firebaseio.com/inputs");
var outcomeFirebaseRef = new Firebase("https://3mbigs.firebaseio.com/outcomes");
*/

var fs = require('fs-extra');

var express = require('express');
var bodyParser = require('body-parser');

var multer = require('multer');

var app = express();

app.use(bodyParser.json());

app.use(express.static('public'));



var actionStrings = ['0: no action', '1: visit to check asset', '2: visit to distribute handouts', '3: email originator', '4: email contractor', '5: email owner', '6: call originator',

	'7: call contractor', '8: call owner', '9: all actions'
];

app.post('/api/upload', multer({
	dest: './uploads/'
}).single('resultFile'), function(req, res) {

	var newFilename = 'public/assets/data/matlabOutput.json';
	fs.copy(req.file.path, newFilename, function(err) {
		if (err) {
			return console.error(err);
		}

		console.log("output uploaded!");

		var tableData = JSON.parse(fs.readFileSync('public/assets/data/table.json', 'utf8'));

		var tableDataArrary = tableData["data"];
		var ticketIndexArrary = {};
		for (var i = 0; i < tableDataArrary.length; i++) {
			var ticketItem = tableDataArrary[i];
			ticketIndexArrary[ticketItem["Ticket Number"]] = i;
		}

		var outputData = fs.readJsonSync('public/assets/data/matlabOutput.json', {
			throws: false
		});

		if (outputData == null) {
			return console.error('Error parsing output file!');
		}

		outputData.forEach(function(data) {
			var assetItem = data;
			var ticketNumber = assetItem["Ticket_Number"];

			if (ticketNumber != null) {
				index = ticketIndexArrary[ticketNumber];
			} else index = null;


			if (index != null) {

				var ticketData = tableDataArrary[index];
				ticketData['System Priority'] = assetItem['System_Priority'];
				var actionID = parseInt(assetItem['Candidate_Actions'], 10);
				ticketData['Recommended Actions'] = actionStrings[actionID];
				console.log(actionStrings[actionID]);

			} else {
				if (ticketNumber != "alanisawesome") console.log("can't find ticket number:", ticketNumber);
			}


		});

		fs.writeFileSync('public/assets/data/table.json', JSON.stringify(tableData, null, 2), 'utf-8');

	})
	res.json(req.file);
	//res.status(204).end();
});


var inputFirebaseRef = new Firebase("https://3mbigs.firebaseio.com/inputs");
var priorityFirebaseRef = new Firebase("https://3mbigs.firebaseio.com/priority");

/*
 priorityFirebaseRef.push().set({
    ticketID: "alanisawesome",
    root: true
  }); */



app.get('/api/download', function(req, res) {

	var tableData = JSON.parse(fs.readFileSync('public/assets/data/table.json', 'utf8'));
	var newFilename = 'backup/BIGSinput' + moment().format("X") + '.json';

	var tableDataArrary = tableData["data"];
	var ticketIndexArrary = {};
	for (var i = 0; i < tableDataArrary.length; i++) {
		var ticketItem = tableDataArrary[i];
		ticketIndexArrary[ticketItem["Ticket Number"]] = i;
	}

	var query = inputFirebaseRef.orderByChild("timeStamp");

	query.once("value", function(snapshot) {
		snapshot.forEach(function(data) {
			var assetItem = data.val();
			var ticketNumber = assetItem["ticketID"];
			if (ticketNumber != null) {
				index = ticketIndexArrary[ticketNumber];
			} else index = null;


			if (index != null) {

				var ticketData = tableDataArrary[index];
				ticketData['Candidate Actions'] = assetItem['actionID'];
			} else {
				if (ticketNumber != "alanisawesome") console.log("can't find ticket number:", ticketNumber);
			}


		});


		var query = priorityFirebaseRef.orderByChild("timeStamp");

		query.once("value", function(snapshot) {
			snapshot.forEach(function(data) {
				var assetItem = data.val();
				var ticketNumber = assetItem["ticketID"];
				if (ticketNumber != null) {
					index = ticketIndexArrary[ticketNumber];
				} else index = null;


				if (index != null) {

					var ticketData = tableDataArrary[index];
					ticketData['Human Priority'] = assetItem['queueID'];
				} else {
					if (ticketNumber != "alanisawesome") console.log("can't find ticket number:", ticketNumber);
				}


			});

			fs.writeFileSync(newFilename, JSON.stringify(tableDataArrary, null, 2), 'utf-8');
			res.download(newFilename);


		}, function(err) {
			console.error("error retrieving priority list!");
		});



	}, function(err) {
		console.log("error retrieving input list!");
	});

});


app.get('/api/exitApp', function(req, res) {

	var backupFilename = 'backup/table' + moment().format("X") + '.json';

	fs.copy('public/assets/data/table.json', backupFilename, function(err) {
			if (err) return console.error(err);
			console.log("App exited: data saved!");
		}) // copies file

	var tableData = JSON.parse(fs.readFileSync('public/assets/data/table.json', 'utf8'));

	var tableDataArrary = tableData["data"];
	var ticketIndexArrary = {};
	for (var i = 0; i < tableDataArrary.length; i++) {
		var ticketItem = tableDataArrary[i];
		ticketIndexArrary[ticketItem["Ticket Number"]] = i;
	}

	var query = inputFirebaseRef.orderByChild("timeStamp");

	query.once("value", function(snapshot) {
		snapshot.forEach(function(data) {
			var assetItem = data.val();
			var ticketNumber = assetItem["ticketID"];
			if (ticketNumber != null) {
				index = ticketIndexArrary[ticketNumber];
			} else index = null;


			if (index != null) {

				var ticketData = tableDataArrary[index];
				ticketData['Candidate Actions'] = assetItem['actionID'];
				//console.log("updated: ", ticketData);
			} else {
				if (ticketNumber != "alanisawesome") console.log("can't find ticket number:", ticketNumber);
			}


		});

		var query = priorityFirebaseRef.orderByChild("timeStamp");

		query.once("value", function(snapshot) {
			snapshot.forEach(function(data) {
				var assetItem = data.val();
				var ticketNumber = assetItem["ticketID"];
				if (ticketNumber != null) {
					index = ticketIndexArrary[ticketNumber];
				} else index = null;


				if (index != null) {

					var ticketData = tableDataArrary[index];
					ticketData['Human Priority'] = assetItem['queueID'];

					//	console.log(assetItem);
				} else {
					if (ticketNumber != "alanisawesome") console.log("can't find ticket number:", ticketNumber);
				}


			});

			fs.writeFileSync('public/assets/data/table.json', JSON.stringify(tableData, null, 2), 'utf-8');
			res.json({
				"message": "App exited: data saved!"
			});



		}, function(err) {
			console.log("error retrieving priority list!");
		});


	}, function(err) {
		console.log("error retrieving input list!");
	});

});

var Converter = require("csvtojson").Converter;

app.post('/api/mergeData', multer({
	dest: './uploads/'
}).single('inputFile'), function(req, res) {
	console.log(req.file); //form files
	var backupFilename = 'backup/table' + moment().format("X") + '.json';

	fs.copy('public/assets/data/table.json', backupFilename, function(err) {
		if (err) return console.error(err);
		console.log("data backup success!");

		var converter = new Converter({});

		//end_parsed will be emitted once parsing finished
		converter.on("end_parsed", function(jsonArray) {
			var tableData = {
				"data": jsonArray
			};
			fs.writeFileSync('public/assets/data/table.json', JSON.stringify(tableData, null, 2), 'utf-8');
		});



		fs.createReadStream(req.file.path).pipe(converter);

	}); // copies file


	/*

	fs.copy(req.file.path, 'public/assets/data/table.json', function(err) {
		if (err) return console.error(err)
		console.log("new ticket file  uploaded!")
	}); */


	//read from file


	res.json(req.file);
	//res.status(204).end();
});



app.get('/api/archiveData', function(req, res) {


	console.log("archiveData called!");
	var query = inputFirebaseRef.orderByChild("timeStamp");
	var count = 0;
	var matlabInput = [];
	query.once("value", function(snap) {

		snap.forEach(function(data) {
			//console.log(data.key());
			var item = data.val();
			if (!item.root) {
				matlabInput.push(data.val());
				data.ref().remove();
				count++;
			}

		});

		var query = priorityFirebaseRef.orderByChild("timeStamp");

		query.once("value", function(snapshot) {
			snapshot.forEach(function(data) {
				var item = data.val();
				if (!item.root) {
					matlabInput.push(data.val());
					data.ref().remove();
					count++;
				}

			});

			var newFilename = 'backup/userInput' + moment().format("X") + '.json';
			fs.writeFileSync(newFilename, JSON.stringify(matlabInput, null, 2), 'utf-8');
			res.download(newFilename);
			console.log("number of records deleted: ", count);

		}, function(err) {
			console.log("error retrieving priority list!");
		});


	});


});



var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Bigs app listening at http://%s:%s', host, port);
});