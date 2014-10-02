// modules =================================================
var express = require('express');
var app     = express();



var busboy = require('connect-busboy');

app.configure(function() {
	app.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 
/*							// log every request to the console
	app.use(function(req, res, next){

	  if (req.method == 'POST')
	  {
		  if (req.is('text/*')) {
		  	console.log("start post");
		    req.text = '';
		    req.setEncoding('utf8');
		    req.on('data', function(chunk){ console.log("getting data", chunk);  req.text += chunk });
		    req.on('end', function(){console.log("next"); next();});
		  } 
		  else {
	    	next();
	  	  }
	  }

	});   */
//	app.use(express.bodyParser()); 						// pull information from html in POST

    app.use(busboy()); 
	app.use(express.methodOverride()); 					// simulate DELETE and PUT
});

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

var port = process.env.PORT || 8080; // set our port

// start app ===============================================
app.listen(port);	
console.log('Server start on port ' + port); 			
exports = module.exports = app; 	

