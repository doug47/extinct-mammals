var express = require('express');
var app = express();
var	http = require('http');
var port = 9030;

app.configure(function() {
  app.use(express.bodyParser());
	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		next();
	});
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/extinctanimals');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error: '));
console.log("This Works!");

var api = require('./api.js');

app.get('/:mammalType?', api.listMammals);
app.post('/', api.saveMammal);

app.listen(port);
console.log("Server listening at port:", port);