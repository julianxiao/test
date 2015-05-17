var jsonServer = require('json-server');

// Express server
var server = jsonServer.create();

// Default middlewares (logger, public, cors)
server.use(jsonServer.defaults);

// Add other Express middlewares if needed (authentication, redirections, ...)

var chance = require('chance');
var moment = require('moment');

var data = {
	faults: [],
	heartbeats: [],
	cellulars: [],
	saus: []
};
 
var deviceNames = require('./data/deviceNames.json');

chance().mixin({
	'fault': function() {
		return {
			"DeviceName": '',
			"SerialNumber": '',
			"RecordType": "WCGFAULTDATA",
			"RecordTime": '',
			"Date":'',
			"Latitude": chance().latitude(),
			"Longitude": chance().longitude(),
			"PowerMeasurements": {
				"RmsCurrent": [{
					"ReadingTime": '',
					"Line": "A",
					"RmsCurrent": chance().floating({
						min: 200,
						max: 300,
						fixed: 1
					})
				}, {
					"ReadingTime": '',
					"Line": "B",
					"RmsCurrent": chance().floating({
						min: 200,
						max: 300,
						fixed: 1
					})
				}, {
					"ReadingTime": '',
					"Line": "C",
					"RmsCurrent": chance().floating({
						min: 200,
						max: 300,
						fixed: 1
					})
				}]
			}

		};
	},
	'heartbeat': function() {
		return {
			"DeviceName": '',
			"SerialNumber": "",
			"RecordType": "WCGHEARTBEATDATA",
			"RecordTime": "",
			"Date": '',
			"Latitude": chance().latitude(),
			"Longitude": chance().longitude(),
			"CellularData": {
				"SystemMode": "ONLINE",
				"RSSI": 100,
				"RoamingIndicator": "N"
			},
			"EnvironmentalData": {
				"WaterLevel": chance().floating({
					min: 0,
					max: 10,
					fixed: 1
				}),
				"Temp": chance().floating({
					min: 40,
					max: 100,
					fixed: 1
				}),
				"Humidity": chance().floating({
					min: 0,
					max: 100,
					fixed: 1
				})
			},
			"PowerMeasurements": {
				"RmsCurrent": [{
					"ReadingTime": "",
					"Line": "A",
					"RmsCurrent": chance().floating({
						min: 200,
						max: 300,
						fixed: 1
					})
				}, {
					"ReadingTime": "",
					"Line": "B",
					"RmsCurrent": chance().floating({
						min: 200,
						max: 300,
						fixed: 1
					})
				}, {
					"ReadingTime": "",
					"Line": "C",
					"RmsCurrent": chance().floating({
						min: 200,
						max: 300,
						fixed: 1
					})
				}],
				"Phase": {
					"PhaseCA": -360.0,
					"PhaseBC": 0.0,
					"PhaseAB": 360.0
				}
			}
		}
	}
});


for (var i = 0; i < (process.env.TIMES || 200); i++) {

	var fault = chance().fault();

	var name = chance().pick(deviceNames.deviceNames);
	fault.DeviceName = name;
	fault.SerialNumber = name;

	var timeStamp = chance().date({
		year: 2015,
		month: 3
	});
	fault.RecordTime = timeStamp;
	fault.Date = moment(timeStamp).format('YYYY-MM-DD');
	fault.PowerMeasurements.RmsCurrent[0].ReadingTime = timeStamp;
	fault.PowerMeasurements.RmsCurrent[1].ReadingTime = timeStamp;
	fault.PowerMeasurements.RmsCurrent[2].ReadingTime = timeStamp;

	data.faults.push(fault);

}

for (var i = 0; i < (process.env.TIMES || 200); i++) {

	var heartbeat = chance().heartbeat();
	
	var name = chance().pick(deviceNames.deviceNames);
	heartbeat.DeviceName = name;
	heartbeat.SerialNumber = name;

	var timeStamp = chance().date({
		year: 2015,
		month: 3
	});
	heartbeat.RecordTime = timeStamp;
	heartbeat.Date = moment(timeStamp).format('YYYY-MM-DD');
	heartbeat.PowerMeasurements.RmsCurrent[0].ReadingTime = timeStamp;
	heartbeat.PowerMeasurements.RmsCurrent[1].ReadingTime = timeStamp;
	heartbeat.PowerMeasurements.RmsCurrent[2].ReadingTime = timeStamp;

	data.heartbeats.push(heartbeat);
}

server.get('/api/schema.json', function(req, res) {
	var jsonFile = require('./data/schema.json');
	res.status(200).json(jsonFile);

});

var configJson = require('./data/config.json');

server.get('/api/config', function(req, res) {
	res.status(200).json(configJson);
});

var express = require('express');
var bodyParser = require('body-parser');
server.use(bodyParser.json());

server.post('/api/config', function(req, res) {
	configJson = req.body;
	res.status(200).json(configJson);
});

require('fs').writeFileSync('data/db.json', JSON.stringify(data, null, 2), 'utf-8');

server.use('/api', jsonServer.router('data/db.json'));


server.listen((process.env.PORT || 3000));