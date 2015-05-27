var jsonServer = require('json-server');

// Express server
var server = jsonServer.create();

// Default middlewares (logger, public, cors)
server.use(jsonServer.defaults);

// Add other Express middlewares if needed (authentication, redirections, ...)

var chance = require('chance');
var moment = require('moment');

var data = {
	logItems: [],
	cabinets: []
};

var CABNITENUMBER = 15;

for (var i = 0; i < (process.env.TIMES || CABNITENUMBER); i++) {

	var cabinet = {
		'id': i + 1,
		'oldPassword': chance().integer({
			min: 10000000,
			max: 99999999
		}),
		'newPassword': chance().integer({
			min: 10000000,
			max: 99999999
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


for (var i = 0; i < (process.env.TIMES || 8); i++) {
	var timeStamp = chance().date({
		year: 2015,
		month: 3
	});
	var cabinetID = chance().integer({
		min: 1,
		max: CABNITENUMBER
	});
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



server.get('/api/log', function(req, res) {

	var logItem = {
		'id': data.logItems.length,
		'name': req.query.name,
		'timeStamp': moment(),
		'cabinetID': req.query.cabinetID,
		'action': req.query.action,
		'text': chance().sentence({
			words: 4
		})
	};
	data.logItems.push(logItem);

	var cabinetItem = data.cabinets[req.query.cabinetID - 1];

	if (req.query.action == 'check out') {


		cabinetItem.oldPassword = cabinetItem.newPassword;
		cabinetItem.newPassword = chance().integer({
			min: 10000000,
			max: 99999999
		});
		cabinetItem.warning = '';

		lastEvent.event = 'check out';
		lastEvent.reload = true;

		data.cabinets[req.query.cabinetID - 1] = cabinetItem;
	}

	if (req.query.action == 'check in') {

		cabinetItem.name = req.query.name;
		cabinetItem.openTime = moment();
		cabinetItem.warning = 'alert-warning';

		lastEvent.event = 'check in';
		lastEvent.reload = true;

		data.cabinets[req.query.cabinetID - 1] = cabinetItem;
	}
	res.json(logItem);
});

var lastEvent = {
	event: 'check out',
	reload: false
};



server.get('/api/getDoorStatus', function(req, res) {
	/*
	if (showWarning) {
		res.json({
			showWarning: true,
		});
		showWarning = false;
	} else {
		res.json({
			showWarning: false
		});
	}*/
	res.json(lastEvent);

	if (lastEvent.reload) {
		lastEvent.reload = false;
	}

});


server.get('/api/wait', function(req, res) {
	var stop = new Date().getTime();
	while (new Date().getTime() < stop + 2000) {;
	}

});

var fs = require('fs');

fs.writeFileSync('logItems.json', JSON.stringify(data, null, 2), 'utf-8');
data = JSON.parse(fs.readFileSync('logItems_backup.json', 'utf8'));

server.use(jsonServer.router(data));



server.listen(3000);