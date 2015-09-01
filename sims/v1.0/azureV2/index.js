var express = require('express');

var server = express();


var chance = require('chance');
var moment = require('moment');


var stormpath = require('express-stormpath');

server.use(stormpath.init(server, {
	apiKeyFile: 'apiKey-2KW6OEO7N90D0TKISC4B73LXN.properties',
	application: 'https://api.stormpath.com/v1/applications/349XmAR3SwCPldtWcx3v6l',
	secretKey: 'ro8LejmUmcK4HDoqWQq5GmgP6jbhLB5p5GhYGAaFAB4',
}));



server.use(function(req, res, next) {
	if (req.user == null) {
		return res.redirect('/login');
	}
	next();
});


server.use(express.static(__dirname + '/public'));

server.get('/api/sms', function(req, res) {

	var accountSid = 'ACcb6813e9814d81f81618bea23d3f4f56';
	var authToken = '8fe92380e15ffc731a1a6c33debf79be';

	var client = require('twilio')(accountSid, authToken);
	//var phonenumber = '13122888204';
	console.log('sending sms ...', req.query.phonenumber);
	var phonenumber = req.query.phonenumber;


	client.messages.create({
		to: phonenumber,
		from: "+16504886806",
		body: "EBAMS: work order created!",
	}, function(err, responseData) { //this function is executed when a response is received from Twilio

		if (!err) { // "err" is an error received during the request, if any

		}
	});
	res.send("");

});

var openConnections = [];

// simple route to register the clients
server.get('/api/statusUpdate', function(req, res) {

	// set timeout as high as possible
	req.socket.setTimeout(0x7FFFFFFF);

	// send headers for event-stream connection
	// see spec for more information
	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive'
	});
	res.write('\n');

	// push this res object to our global variable
	openConnections.push(res);

	// When the request is closed, e.g. the browser window
	// is closed. We search through the open connections
	// array and remove this connection.
	req.on("close", function() {
		var toRemove;
		for (var j = 0; j < openConnections.length; j++) {
			if (openConnections[j] == res) {
				toRemove = j;
				break;
			}
		}
		openConnections.splice(j, 1);
	});
});


var Firebase = require("firebase");
var backupFirebaseRef = new Firebase("https://sweltering-heat-1060.firebaseio.com/");
var backupRef = backupFirebaseRef.child("passwords");

var userRef = new Firebase('https://ebams.firebaseio.com/users');
var orderRef = new Firebase('https://ebams.firebaseio.com/orders');
var assetRef = new Firebase('https://ebams.firebaseio.com/assets');
var eventRef = new Firebase('https://ebams.firebaseio.com/events');
var passwordRef = new Firebase('https://ebams.firebaseio.com/passwords');


server.get('/api/login', function(req, res) {

	var username = req.query.username;
	var password = req.query.password;
	var userFound = false;

	userRef.once("value", function(snapshot) {
		snapshot.forEach(function(data) {
			var user = data.val();
			if (username == user.username && password == user.password) {
				userFound = true;
				console.log("The " + data.key() + " user name is " + user.username);
			}

		});
		if (userFound) {
			res.json({
				'status': 'login success'
			});
		} else {
			res.json({
				'status': 'login failed'
			});
		}

	}, function(err) {
		res.json({
			'status': 'failed to read user data'
		});
	});
});


function createMsg(user, asset, action) {
	msg = {};

	msg.user = user;
	msg.asset = asset;
	msg.action = action;
	msg.createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');

	return JSON.stringify(msg);
}

server.get('/api/checkin', function(req, res) {

	openConnections.forEach(function(resp) {
		var d = new Date();
		resp.write('id: ' + d.getMilliseconds() + '\n');
		resp.write('data:' + createMsg(req.query.username, req.query.assetID, 'check in') + '\n\n'); // Note the extra newline
	});

	var assetID = req.query.assetID;
	var username = req.query.username;

	var returnValue = null;

	var eventItem = null;

	orderRef.once("value", function(snapshot) {

		snapshot.forEach(function(data) {
			var order = data.val();
			var user = order.user;
			var asset = order.asset;
			if (user && asset) {
				if (username == user.username && assetID == asset.uiud) {
					eventItem = {
						'username': username,
						'assetID': assetID,
						'timeStamp': Firebase.ServerValue.TIMESTAMP,
						'action': 'check in',
						'description': order.description
					}
				}
			}
		});

		if (eventItem) {
			eventRef.push().set(eventItem);
			console.log(JSON.stringify(eventItem));
			passwordRef.child(eventItem.assetID).once("value", function(snapshot) {
				password = snapshot.val();
				res.json({
					'status': 'ok',
					'password': password
				});

			}, function(err) {
				res.json({
					'status': 'failed to read password'
				});
			});

		} else {
			res.json({
				'status': 'no work order'
			});
		}

	}, function(err) {
		res.json({
			'status': 'failed to read work orders'
		});
	});
});

server.get('/api/updatePassword', function(req, res) {

	var assetID = req.query.assetID;
	var username = req.query.username;
	//var updatePassword = req.query.updatePassword;

	newPassword = chance().hash({
		length: 8
	});

	var returnValue = null;

	orderRef.once("value", function(snapshot) {

		var found = false;

		snapshot.forEach(function(data) {
			var order = data.val();
			var user = order.user;
			var asset = order.asset;
			if (user && asset) {
				if (username == user.username && assetID == asset.uiud) {
					found = true;
				}
				//console.log('username:', username, " vs. ", user.username);
				//console.log('id:', assetID, " vs. ", asset.uiud);
			}

		});
		if (found) {

			var passwordObj = {};
			passwordObj[assetID] = newPassword;

			passwordRef.update(passwordObj);

			console.log('asset: ', assetID, 'new password: ', newPassword);
			returnValue = {
				'status': 'ok',
				'newPassword': newPassword
			};

			//backup passwords
			var passwordLogItem = {
				'cabinetID': assetID,
				'password': newPassword,
				'timeStamp': Firebase.ServerValue.TIMESTAMP
			}
			backupRef.push(passwordLogItem);

		} else {
			returnValue = {
				'status': 'no work order'
			};
		}

		res.json(returnValue);

	}, function(err) {
		res.json({
			'status': 'failed to read work orders'
		});
	});

});


server.get('/api/checkout', function(req, res) {
	openConnections.forEach(function(resp) {
		var d = new Date();
		resp.write('id: ' + d.getMilliseconds() + '\n');
		resp.write('data:' + createMsg(req.query.username, req.query.assetID, 'check out') + '\n\n'); // Note the extra newline
	});

	var assetID = req.query.assetID;
	var username = req.query.username;

	var eventItem = {
		'username': username,
		'assetID': assetID,
		'timeStamp': Firebase.ServerValue.TIMESTAMP,
		'action': 'check out',
	}
	eventRef.push().set(eventItem);
	res.json(eventItem);

});


var port = process.env.PORT || 3000;

server.listen(port, function() {
	console.log("Access control server is up running at port 3000!");
});