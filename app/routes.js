//var Xively = require('./models/xively');
var MongoLab = require('./models/mongolab');
var SensorData = require('./models/sensordata');

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

        //console.log(req.text);

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
        if (req.query.method === 'put')
        {
            var sensor = new SensorData(); // 
            var now = new Date();
            var jsonDate = now.toJSON();
            console.log(req.query);
            sensor.message = {createdAt: jsonDate, id: req.query.id, value: req.query.value};
            sensor.save(function (err) {
                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json({
                    message: sensor.message
                });
            });
                // 
        }
        else
        {
            SensorData.find(function (err, sensors) {
                if (err)
                    res.send(err);

           // console.log('sucess', sensors);


                res.json(sensors);
            });
           
        }
    });

    app.get('/api/xively', function (req, res) {
           
        MongoLab.find(function (err, xivelies) {
            if (err)
                res.send(err);

            console.log('sucess', xivelies);

            res.json(xivelies);
        });
    });



    // route to handle creating (app.post)
    // route to handle delete (app.delete)
/*

    app.get('*', function (req, res) {
        res.sendfile('./public/index.html');
    }); */

};