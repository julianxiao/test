var jsonServer = require('json-server');

// Express server
var server = jsonServer.create();

// Default middlewares (logger, public, cors)
server.use(jsonServer.defaults);

// Add other Express middlewares if needed (authentication, redirections, ...)

var chance = require('chance');
var moment = require('moment');


server.get('/api/schema.json', function(req, res) {
	var jsonFile = require('./data/schema.json');
	res.status(200).json(jsonFile);

});



var express = require('express');
var bodyParser = require('body-parser');
server.use(bodyParser.json());

server.post('/api/config', function(req, res) {
	configJson = req.body;
	res.status(200).json(configJson);
});

var data = {
	faults: [],
	heartbeats: [],
	cellulars: [],
	saus: []
};

require('fs').writeFileSync('data/db.json', JSON.stringify(data, null, 2), 'utf-8');

server.use('/api', jsonServer.router('data/db.json'));


server.listen((process.env.PORT || 3000));