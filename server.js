//Header Code (nest)
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

//Body Code
var ExtinctMammal = mongoose.model('ExtinctMammal', new mongoose.Schema({
	name: String, 
	mammalType: {type: String, enum: ["Marsupial", "Sirenian", "Rodent", "Ungulate", "Lagomorph", "Proboscid", "Tubulidentata", "Soricimorph", "Bat", "Cetacean", "Artiodactyl", "Carnivore", "Primate", "Perissodactyl"]}, 
	year_extinct: Number,
}));


var testmammal = new ExtinctMammal({
	name: 'Test Mammal',
	mammalType: "Marsupial",
	year_extinct: 1875
});



testmammal.save(function(err, mammal) {
	if(err) {
		console.log(err);
	}
	else
	{
		console.log("Mammals have been made");
		console.log(mammal);
	}
});

app.get('/', function(req, res) {
	ExtinctMammal.find(function(err, mammals) {
		if(err) {
		console.log(err);
		}
	else
	{
		res.send(mammals);
	}
	});
});

app.post('/', function(req, res){
	var newMammal = new ExtinctMammal({
		name: req.body.name,
		mammalType: req.body.mammalType,
		year_extinct: req.body.year_extinct
	});
	newMammal.save(function(err) {
		res.send("This was posted");
	});
});

app.listen(port);
console.log("Server listening at port:", port);