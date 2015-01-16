require('mongoose').connect('127.0.0.1:27017/FactoryDude');
var factoryDude = require('../index');
describe('create a database entry of a mongoose model', function(){
	it('should take something that is not an object and throw an error', function(next){
		expect(factoryDude('./','foo')).toThrow(new Error('FactoryDude can only take objects to create new mongoose entries'));
	});
	it('should take an object with attributes for a mongoose model and create a specific mongoose model from it', function(){
		var testPersonAttrs = {
			firstName: 'Dummy',
			lastName: 'Test',
			greeting: 'Hi There',
			birthday: new Date(),
			age: 0
		};
		var newModel = factoryDude('./spec/support/models/person',testPersonAttrs);
		expect(newModel.firstName).toBe('Dummy');
		expect(newModel.lastName).toBe('Test');
		expect(newModel.greeting).toBe('Hi There');
		expect(newModel.birthday).toBe(new Date());
		expect(newModel.age).toBe(0);
		var checkModel = require('./spec/support/models/person');
		checkModel.find({firstName: newModel.firstName}, function(err, res){
			if(err){
				throw err;
			}
			expect(res).toBe(newModel);
		});
	});
});
