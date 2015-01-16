var mongoose = require('mongoose');

var personSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	greeting: String,
	birthday: Date,
	age: Number
});

module.exports = mongoose.model('person', personSchema);
