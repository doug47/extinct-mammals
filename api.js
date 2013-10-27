var ExtinctMammal = require ('./mammal.js');

module.exports.listMammals = function(req, res) {
	var query ={};
	if (req.params.mammalType) {
		query = {mammalType: req.params.mammalType};
	} 
	ExtinctMammal
	.find(query)
	.sort('name')
	.select('name mammalType year_extinct')
	.exec(function (err, mammals) {
		res.send({results:mammals})
	});

};

module.exports.saveMammal = function(req, res){
	var newMammal = new ExtinctMammal({
		name: req.body.name,
		mammalType: req.body.mammalType,
		year_extinct: req.body.year_extinct
	});
	newMammal.save(function(err) {
		res.send("This was posted");
	});
};
