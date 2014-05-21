var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };       


var db = require('../../config/db');

mongoose = mongoose.createConnection(db.urlLab, options, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + db.urlLab + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + db.urlLab);
  }
}); 

var XivelySchema   = new Schema({
	xivelyPostData: Object
});

module.exports = mongoose.model('xivelies', XivelySchema);
