var express = require('express');
var server = express();

var chance = require('chance');
var moment = require('moment');


server.set('port', (process.env.PORT || 5000));
server.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
server.use(bodyParser.json());

var shell = require('shelljs');
var trigger = false;

var fs = require('fs-extra');


server.get('/api/execBigs', function(req, res) {
	var stop = new Date().getTime();
	while (new Date().getTime() < stop + 5000) {;
	}
	//shell.exec('bigs InputMatrix.json');
	var jsonFile = require('./Results.json');
	res.status(200).json(jsonFile);
	//fs.removeSync('data/test1.json');
});

server.get('/api/execBigData', function(req, res) {
	shell.exec('cp data/test.json data/test1.json');
	var jsonFile = require('./data/Results-backup.json');
	res.status(200).json(jsonFile);
	fs.removeSync('data/test1.json');
});

server.get('/api/execCompare', function(req, res) {
	var stop = new Date().getTime();
	while (new Date().getTime() < stop + 5000) {;
	}
	shell.exec('cp data/test.json data/test1.json');
	res.status(200).json({
		message: "successful"
	});
	fs.removeSync('data/test1.json');
});

server.get('/api/schema.json', function(req, res) {
	var jsonFile = require('./data/schema.json');

	res.status(200).json(jsonFile);

});



server.post('/api/calcBigs', function(req, res) {
	inputJson = req.body;
	fs.writeJson('./InputMatrix-test.json', inputJson, function(err) {
		if(err) console.log(err);
	});
	shell.exec('bigs InputMatrix-test.json');

	var stop = new Date().getTime();
	while (new Date().getTime() < stop + 5000) {;
	}
	var jsonFile = require('./Results.json');
	res.status(200).json(jsonFile);

});


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

var chokidar = require('chokidar');

// One-liner for current directory, ignores .dotfiles
chokidar.watch('./data/test1.json', {
	ignored: /[\/\\]\./
}).on('change', function(event, path) {
	console.log(event, path);
	var jsonFile = require('./data/Results-backup.json');
});


require('fs').writeFileSync('data/db.json', JSON.stringify(data, null, 2), 'utf-8');




server.listen(server.get('port'), function() {
	console.log('Node app is running on port', server.get('port'));
});