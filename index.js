module.exports = function(){
	this.factory = function(relativePathToModel, newObject){
		if(typeof newObject != 'object'){
			throw new Error('FactoryDude can only take objects to create new mongoose entries');
			return;
		}
		var model = require(relativePathToModel);
		var newModel = new model();
		var attrCounter = 0;
		for(var attr in newObject){
			eval('newModel.'+attr+' = newObject.'+attr);
		}
		newModel.save(function(err){
			if(err){
				throw err;
			}
		});
		return newModel
	};
	
	this.reference = function(queryArg){
		
	};
};
