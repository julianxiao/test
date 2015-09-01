var jsonServer = require('json-server');

var server = jsonServer.create();

server.use(jsonServer.defaults);

var chance = require('chance');
var moment = require('moment');

var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://ebams.firebaseio.com/");

var usersRef = myFirebaseRef.child("users");
var assetsRef = myFirebaseRef.child("assets");
var ordersRef = myFirebaseRef.child("orders");


for (var i = 0; i < 4; i++) {

	var emailString = chance().email({domain: 'example.com'});

	var user = {
		'name': chance().name(),
		'email': emailString,
		'username': emailString,
		'password': chance().string({length: 5}),
		'phone': chance().phone(),
		'role': chance().pick(['contractor', 'administrator']),
		'notification': chance().pick(['none', 'email', 'sms'])
	};

	usersRef.push(user);
} 

/*
for (var i = 0; i < 3; i++) {

	var asset = {
		'uiud': chance().hash({length: 16}),
		'description': chance().sentence({
			words: 4
		}),
		'status': 'closed',
		'passwords': []
	};

	assetsRef.push(asset);
} */

