var mongoose = require('mongoose');

var ExtinctMammal = mongoose.model('ExtinctMammal', new mongoose.Schema({
	name: String, 
	mammalType: {type: String, enum: ["Marsupial", "Sirenian", "Rodent", "Ungulate", "Lagomorph", "Proboscid", "Tubulidentata", "Soricimorph", "Bat", "Cetacean", "Artiodactyl", "Carnivore", "Primate", "Perissodactyl"]}, 
	year_extinct: Number,
}));

module.exports = ExtinctMammal;