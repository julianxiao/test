var express = require("express");
var logfmt = require("logfmt");
var app = express();


// var phonenumbers =  ['5125877188', '6512605616', '5124175355', '6504883961'];

//var phonenumbers =  ['5125877188']; // Ernie
//var phonenumbers =  ['6512605616']; // bob


var phonenumbers = ['6504883961'];

//var phonenumbers =  [];

var triggerFlag = false;
var eventData = {};

app.use(logfmt.requestLogger());

app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies


app.get('/', function(req, res) {
    res.send('Spartan is UP!');
});

//	http://evening-hollows-1362.herokuapp.com/addPhonenumber?n=6504883961

app.get('/addPhonenumber', function(req, res) {

    var phonenumber = req.query.n;
    var resText = "Phone number added: " + phonenumber;

    console.log('Phone number added: ', phonenumber);
    res.send(resText);
    phonenumbers.push(phonenumber);

});

app.get('/reset', function(req, res) {

    // phonenumbers = ['5125877188', '6512605616', '5124175355', '6504883961'];
    phonenumbers = [];
    var resText = "phone numbers have been reset!";

    //                console.log('phonenumber added: ', phonenumber);
    res.send(resText);

});

app.get('/list', function(req, res) {

    var list = "list: ";
    for (var i = 0; i < phonenumbers.length; i++) {
        var phonenumber = phonenumbers[i];
        list = list + phonenumber + " ";
    }

    res.send(list);
});

app.get('/*', function(req, res, next) {
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next();
});

app.get('/api/checkTrigger', function(req, res) {

    if(triggerFlag)
    {

        res.json({
            trigger: triggerFlag,
            data: eventData
        });
        triggerFlag = false;
    }
    else
    {
        res.json({trigger:false});
    }

});



app.post('/api/demo', function(req, res) {

    var postData = req.body; // 


    if (postData.RecordType == "FAULT") {
        console.log("fault happens!");

        triggerFlag = true;

        eventData = postData;

    }

    res.send("");


});




app.get('/api/sms', function(req, res) {

    var accountSid = 'ACcb6813e9814d81f81618bea23d3f4f56';
    var authToken = '8fe92380e15ffc731a1a6c33debf79be';
    var client = require('twilio')(accountSid, authToken);
    console.log('sending sms ...');

    var list = "phone numbers: ";

    if (req.query.name == "Ernie Rodriguez")
    {
      phonenumbers =  ['5125877188'];
    }

    if (req.query.name == "Doug")
    {
      phonenumbers =  ['5124175355'];
    }

    if (req.query.name == "Bob")
    {
      phonenumbers =  ['6512605616'];
    } 

    for (var i = 0; i < phonenumbers.length; i++) {
        var phonenumber = phonenumbers[i];
        list = list + phonenumber + " ";

        client.messages.create({
            to: phonenumber,
            from: "+16504886806",
            body: "Spartan new work order. Please visit http://goo.gl/rF7wm4",

            //  body: JSON.stringify(postData),

            //Sensor ID: 29A8C \nFault: Power failure \nPlease visit https://db.tt/fCSFvcbw
        }, function(err, responseData) { //this function is executed when a response is received from Twilio

            if (!err) { // "err" is an error received during the request, if any

               console.log("sent successfully!");
            }
        });
    }
    console.log(list);
    res.send(req.query.name);

});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});