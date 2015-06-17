var jsonServer = require('json-server');

var server = jsonServer.create();

server.use(jsonServer.defaults);

var chance = require('chance');
var moment = require('moment');

var fs = require('fs');


var data = {
	logItems: [],
	cabinets: [],
	passwords: []
};

var cabinet = {
	'id': 'e00258cb5a815633',
	'oldPassword': chance().hash({
			length: 8
		}),
	'newPassword': '01000000',
	'name': chance().name(),
	'openTime': chance().date({
		year: 2015,
		month: 4
	}),
	'warning': ''
};
data.cabinets.push(cabinet);

for (var i = 0; i < 15; i++) {

	var cabinet = {
		'id': chance().hash({
			length: 16
		}),
		'oldPassword': chance().hash({
			length: 8
		}),
		'newPassword': chance().hash({
			length: 8
		}),
		'name': chance().name(),
		'openTime': chance().date({
			year: 2015,
			month: 4
		}),
		'warning': ''
	};
	data.cabinets.push(cabinet);
}


for (var i = 0; i < 8; i++) {
	var timeStamp = chance().date({
		year: 2015,
		month: 3
	});
	var cabinetIndex = chance().integer({
		min: 1,
		max: data.cabinets.length
	});
	var cabinet = data.cabinets[cabinetIndex - 1];
	var cabinetID = cabinet.id;
	var name = chance().name();
	var logItemCheckin = {
		'id': i * 2 + 1,
		'name': name,
		'timeStamp': timeStamp,
		'cabinetID': cabinetID,
		'action': 'check in',
		'text': chance().sentence({
			words: 4
		})
	}
	data.logItems.push(logItemCheckin);

	var timeStampNew = moment(timeStamp).add(chance().integer({
		min: 1,
		max: 5
	}), 'hours');

	var logItemCheckout = {
		'id': i * 2 + 2,
		'name': name,
		'timeStamp': timeStampNew,
		'cabinetID': cabinetID,
		'action': 'check out',
		'text': chance().sentence({
			words: 4
		})
	}
	data.logItems.push(logItemCheckout);

} 

server.get('/api/checkin', function(req, res) {

	var logItem = {
		'id': data.logItems.length,
		'name': req.query.name,
		'timeStamp': moment(),
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
			console.log(cabinetIndex);
		}
	}

	var cabinetItem = data.cabinets[cabinetIndex];
	cabinetItem.name = req.query.name;
	cabinetItem.openTime = moment();
	cabinetItem.warning = 'alert-warning';

	lastEvent.event = 'check in';
	lastEvent.reload = true;

	data.cabinets[cabinetIndex] = cabinetItem;
	res.json(cabinetItem);
});

server.get('/api/checkout', function(req, res) {

	var logItem = {
		'id': data.logItems.length,
		'name': req.query.name,
		'timeStamp': moment(),
		'cabinetID': req.query.cabinetID,
		'action': 'check out',
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
			console.log(cabinetIndex);
		}
	}

	var cabinetItem = data.cabinets[cabinetIndex];

	data.passwords.push(cabinetItem.oldPassword);

	cabinetItem.oldPassword = cabinetItem.newPassword;
	cabinetItem.newPassword = chance().hash({
			length: 8
		}),
	cabinetItem.warning = '';

	lastEvent.event = 'check out';
	lastEvent.reload = true;

	data.cabinets[cabinetIndex] = cabinetItem;

	fs.writeFileSync('logItems_saved.json', JSON.stringify(data, null, 2), 'utf-8');

	res.json(cabinetItem);
});

var lastEvent = {
	event: 'check out',
	reload: false
};

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
	res.json({});
});

server.get('/api/login', function(req, res) {
	var stop = new Date().getTime();
	while (new Date().getTime() < stop + 1000) {;
	}
	res.json({});

});


//fs.writeFileSync('logItems_saved.json', JSON.stringify(data, null, 2), 'utf-8');
data = JSON.parse(fs.readFileSync('logItems_saved.json', 'utf8'));

server.use('/api', jsonServer.router(data));

var port = Number(process.env.PORT || 3000);

server.listen(port, function() {
	console.log("Access control server is up running at port 3000!");
});