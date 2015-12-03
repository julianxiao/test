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


app.post('/api/upload', multer({
	dest: './uploads/'
}).single('resultFile'), function(req, res) {
	console.log(req.file); //form files
	/* example output:
            { fieldname: 'upl',
              originalname: 'grumpy.png',
              encoding: '7bit',
              mimetype: 'image/png',
              destination: './uploads/',
              filename: '436ec561793aa4dc475a88e84776b1b9',
              path: 'uploads/436ec561793aa4dc475a88e84776b1b9',
              size: 277056 }
	 */
	var newFilename = 'public/assets/data/matlabOutput.json';
	fs.copy(req.file.path, newFilename, function(err) {
		if (err) return console.error(err);

		console.log("output uploaded!")
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
			console.log("error retrieving priority list!");
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
var converter = new Converter({});

//end_parsed will be emitted once parsing finished
converter.on("end_parsed", function(jsonArray) {
	var tableData = {
		"data": jsonArray
	};
	fs.writeFileSync('public/assets/data/table.json', JSON.stringify(tableData, null, 2), 'utf-8');
});

app.post('/api/mergeData', multer({
	dest: './uploads/'
}).single('inputFile'), function(req, res) {
	console.log(req.file); //form files
	var backupFilename = 'backup/table' + moment().format("X") + '.json';

	fs.copy('public/assets/data/table.json', backupFilename, function(err) {
			if (err) return console.error(err);
			console.log("data backup success!");
		}) // copies file

	fs.createReadStream(req.file.path).pipe(converter);

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