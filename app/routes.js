//var Xively = require('./models/xively');
// var MongoLab = require('./models/mongolab');

var SensorData = require('./models/sensordata');

var SensorSimulation = require('./models/sensorSimulation.js');

var simulation = new SensorSimulation();

var triggerFlag = false;

var fs = require('fs');

module.exports = function (app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // frontend routes =========================================================
    // route to handle all angular requests


    // sample api route
    app.post('/api/xively', function (req, res) {

        var xively = new Xively(); // 
        xively.xivelyPostData = req.body; // 

        xively.save(function (err) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json({
                message: 'xively data recorded!'
            });
        });
    });

    app.post('/api/analytics/sensordata', function (req, res) {

        var sensor = new SensorData(); // 
        sensor.message = req.body; // 
        //   sensor.message = req.text; // 

        //   console.log(req);

        sensor.save(function (err) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json({
                message: sensor.message
            });
        });
    });

    app.get('/api/analytics/sensordata', function (req, res) {

        //console.log('get data');
        if (req.query.method === 'put') {
            var sensor = new SensorData(); // 
            var now = new Date();
            var jsonDate = now.toJSON();
            console.log(req.query);
            sensor.message = {
                createdAt: jsonDate,
                id: req.query.id,
                value: req.query.value
            };
            sensor.save(function (err) {
                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json({
                    message: sensor.message
                });
            });
            // 
        } else {
            SensorData.find(function (err, sensors) {
                if (err)
                    res.send(err);

                // console.log('sucess', sensors);


                res.json(sensors);
            });

        }
    });

    app.get('/api/checkTrigger', function (req, res) {

            res.json( {trigger: triggerFlag });
            triggerFlag = false;

    });

    app.get('/api/xively', function (req, res) {

        MongoLab.find(function (err, xivelies) {
            if (err)
                res.send(err);

            console.log('sucess', xivelies);

            res.json(xivelies);
        });
    });

    app.get('/api/sms', function (req, res) {

        /*

        var accountSid = 'ACcb6813e9814d81f81618bea23d3f4f56';
        var authToken = '8fe92380e15ffc731a1a6c33debf79be';

        //require the Twilio module and create a REST client 
        var client = require('twilio')(accountSid, authToken);

        var phonenumber = req.query.phonenumber;

        client.messages.create({
            to: phonenumber,
            from: "+16504886806",
            body: "Sensor ID: 29A8C \nFault: Power failure \nhttps://db.tt/fCSFvcbw",
        }, function (err, responseData) { //this function is executed when a response is received from Twilio

            if (!err) { // "err" is an error received during the request, if any

                // "responseData" is a JavaScript object containing data received from Twilio.
                // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
                // http://www.twilio.com/docs/api/rest/sending-sms#example-1

                console.log('message to:', responseData.to); // outputs "+14506667788"
                console.log(responseData.body); // outputs "word to your mother."
                res.send(responseData);
                triggerFlag = true;

            }
        }); */

    });

    app.get('/api/ding/', function (req, res) {

            res.json( {success: true });
 
    });




    app.post('/api/uploadControl', function (req, res) {

    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        console.log("fieldname: " + fieldname);
        if (fieldname == "controldatafile")
            fstream = fs.createWriteStream(__dirname + '/../public/daylight/data/control1.csv');
        else
            fstream = fs.createWriteStream(__dirname + '/../public/daylight/data/test1.csv');
            
        file.pipe(fstream);
        fstream.on('close', function () {
          //  res.redirect('back');
        });
    }); 

    res.redirect('back');

    });

    app.post('/api/uploadLight', function (req, res) {

    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        console.log("fieldname: " + fieldname);
        if (fieldname == "lightdatafile")
            fstream = fs.createWriteStream(__dirname + '/../public/daylight/data/light1.csv');
        else
            fstream = fs.createWriteStream(__dirname + '/../public/daylight/data/power1.csv');
            
        file.pipe(fstream);
        fstream.on('close', function () {
          //  res.redirect('back');
        });
    }); 

    res.redirect('back');

    });


    app.post('/api/uploadPickwick', function (req, res) {

    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        console.log("fieldname: " + fieldname);
        fstream = fs.createWriteStream(__dirname + '/../public/pickwick/data/feeder1.dat');
            
        file.pipe(fstream);
        fstream.on('close', function () {
          //  res.redirect('back');
        });
    }); 

    res.redirect('back');

    });




    // route to handle creating (app.post)
    // route to handle delete (app.delete)
    /*

    app.get('*', function (req, res) {
        res.sendfile('./public/index.html');
    }); */

};