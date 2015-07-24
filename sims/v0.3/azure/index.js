var jsonServer = require('json-server');

var server = jsonServer.create();

server.use(jsonServer.defaults);

var chance = require('chance');
var moment = require('moment');

var fs = require('fs');
var NUMBER_OF_ITEMS = 15;

var data = {
	logItems: [],
	cabinets: [],
	users: [],
	passwords: []
};


var lastEvent = {
	event: 'check out',
	reload: false
};


server.get('/api/checkin', function(req, res) {

	var logItem = {
		'id': data.logItems.length,
		'name': req.query.name,
		'timeStamp': moment().format(),
		'cabinetID': req.query.cabinetID,
		'action': 'check in',
		'text': chance().sentence({
			words: 4
		})
	};
	data.logItems.push(logItem);

	var cabinetIndex = 0;
	for (var i = 0; i < data.cabinets.length; i++) {
		var cabinetID = data.cabinets[i].id;
		if (cabinetID == req.query.cabinetID) {
			cabinetIndex = i;
		}
	}

	var cabinetItem = data.cabinets[cabinetIndex];
	cabinetItem.name = req.query.name;
	cabinetItem.openTime = moment().format();
	cabinetItem.warning = 'alert-warning';

	lastEvent.event = 'check in';
	lastEvent.reload = true;

	data.cabinets[cabinetIndex] = cabinetItem;
	res.json(cabinetItem);
});

var previousRequestTime = 0;


server.get('/api/checkout', function(req, res) {

	var cabinetIndex = 0;
	for (var i = 0; i < data.cabinets.length; i++) {
		var cabinetID = data.cabinets[i].id;
		if (cabinetID == req.query.cabinetID) {
			cabinetIndex = i;
		}
	}

	var cabinetItem = data.cabinets[cabinetIndex];

	// prevent multiple password change request
	var stop = new Date().getTime();
	if (stop > previousRequestTime + 3000) {
		data.passwords.push(cabinetItem);
		cabinetItem.oldPassword = cabinetItem.newPassword;
		cabinetItem.newPassword = chance().hash({
			length: 8
		});

		var logItem = {
			'id': data.logItems.length,
			'name': req.query.name,
			'timeStamp': moment().format(),
			'cabinetID': req.query.cabinetID,
			'action': 'check out',
			'text': chance().sentence({
				words: 4
			})
		};
		data.logItems.push(logItem);

		cabinetItem.warning = '';

		lastEvent.event = 'check out';
		lastEvent.reload = true;

		data.cabinets[cabinetIndex] = cabinetItem;

		fs.writeFileSync('logItems_saved.json', JSON.stringify(data, null, 2), 'utf-8');

	}
	previousRequestTime = stop;

	res.json(cabinetItem);
});


server.get('/api/getDoorStatus', function(req, res) {
	res.json(lastEvent);

	if (lastEvent.reload) {
		lastEvent.reload = false;
	}

});


server.get('/api/wait', function(req, res) {
	var stop = new Date().getTime();
	while (new Date().getTime() < stop + 2000) {;
	}
	res.json({
		'success': true
	});
});

server.get('/api/login', function(req, res) {

	var username = req.query.username;
	var password = req.query.password;


	res.json({
		'success': true
	});

});



data = JSON.parse(fs.readFileSync('logItems_saved.json', 'utf8'));

server.use('/api', jsonServer.router(data));

var port = process.env.PORT || 3000;

server.listen(port, function() {
	console.log("Access control server is up running at port 3000!");
});