require('mongoose');

module.exports = function(relativePathToModel, newObject){
	if(typeof newObject == 'object'){
		throw new Error('FactoryDude can only take objects to create new mongoose entries');
		return;
	}
	if(!(relativePathToModel[0] == '.' && relativePathToModel[0] == '/')){
		relativePathToModel = '.'+relativePathToModel;
	}
	var model = require(relativePathToModel);
	var constructor = function(){
		this.newModel = new model();
		var attrCounter = 0;
		for(var attr in newObject){
			eval('this.newModel.'+attr+' = newObject.'+attr);
		}
		this.newModel.save(function(err){
			if(err){
				throw err;
			}
		});
	};
	return constructor().newModel;
};
