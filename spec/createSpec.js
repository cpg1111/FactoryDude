require('mongoose').connect('127.0.0.1:27017/FactoryDude');
var FactoryDude = require('../index');
factoryDude = new FactoryDude();
describe('create a database entry of a mongoose model', function(){
	it('should take something that is not an object and throw an error', function(next){
		expect(function(){factoryDude.factory('badTest', './support/models/person','foo');}).toThrow(new Error('FactoryDude can only take objects to create new mongoose entries'));
		next();
	});
	it('should take an object with attributes for a mongoose model and create a specific mongoose model from it', function(next){
		var testPersonAttrs = {
			firstName: 'Dummy',
			lastName: 'Test',
			greeting: 'Hi There',
			birthday: new Date(),
			age: 0
		};
		var newModel = factoryDude.factory('goodTest','./spec/support/models/person',testPersonAttrs);
		expect(newModel.firstName).toBe('Dummy');
		expect(newModel.lastName).toBe('Test');
		expect(newModel.greeting).toBe('Hi There');
		expect(newModel.age).toBe(0);
		var checkModel = require('./support/models/person');
		checkModel.findOne({firstName: newModel.firstName}, function(err, res){
			if(err){
				throw err;
			}
			expect(res).toBe(newModel);
		});
		next();
	});
});
describe('create one model and reference one of its attributes in another object', function(){
	it('should have the second model contain an attribute from the first model', function(next){
		var testPersonAttrs1 = {
			firstName: 'Dummy',
			lastName: 'Test',
			greeting: 'Hi There',
			birthday: new Date(),
			age: 0
		};
		var firstModel = factoryDude.factory('firstModel', './spec/support/models/person', testPersonAttrs1);
		var testPersonAttrs2 = {
			firstName: 'Guy',
			lastName: factoryDude.reference('firstModel', 'lastName'),
			greeting: 'Hi There',
			birthday: new Date(),
			age: 0
		};
		var secondModel = factoryDude.factory('secondModel', './spec/support/models/person', testPersonAttrs2);
		expect(firstModel.lastName == secondModel.lastName).toBe(true);
		expect(firstModel.firstName != secondModel.firstName).toBe(true);
		next();
	});
});
