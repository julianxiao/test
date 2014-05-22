var mongodb     = require('mongoose');
var Schema       = mongodb.Schema;

var db = require('../../config/db');

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };       


var localDB = mongodb.createConnection(db.url, options, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + db.url + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + db.url);
  }
}); 

var SensorSchema  = new Schema({
	message: String
});

module.exports = localDB.model('SensorData', SensorSchema);
