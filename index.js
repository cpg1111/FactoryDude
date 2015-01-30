module.exports = function(){
	var factories = [];

	this.factory = function(factoryName, relativePathToModel, newObject){
		if(typeof newObject != 'object'){
			throw new Error('FactoryDude can only take objects to create new mongoose entries');
			return;
		}
		var model = require(relativePathToModel);
		var newModel = new model();
		var attrCounter = 0;
		for(var attr in newObject){
			if(hasAttribute(newModel, attr)){
				newModel[attr] = newObject[attr];
			}
			else{
				throw new Error('Attribute: '+attr+' does not exist in model');
			}
		}
		newModel.save(function(err){
			if(err){
				throw err;
			}
		});
		factories.push({name: factoryName, model: newModel});
		return newModel;
	};
	
	this.reference = function(factoryName, attr){
		var matchModel = findFactory(factoryName);
		if(hasAttribute(matchModel, attr)){
			return matchModel[attr];
		}
		else{
			throw new Error('Cannot reference '+factoryName+', '+attr+' does not exist within factory');
		}
		
	};

	this.destroy = function(factoryName){
		var destroyModel = findFactory(factoryName);
		factories.splice(findFactoryIndex(factoryName), 1);
		destroyModel.remove({id: destroyModel.id}, function(err){
			if(err){
				throw err;
			}
		});
	};

	var hasAttribute = function(model, attr){
		var result = false;
		for(var comparison in model){
			result = (comparison == attr);
			if(result){
				break;
			}
		}
		return result;
	};

	var findFactory = function(factoryName){
		var match = false;
		var matchModel = {};
		for (var i = 0; i < factories.length; i++) {
			match = (factories[i].name == factoryName)
			if(match){
				matchModel = factories[i].model;
				break;
			}
		}
		if(match){
			return matchModel;
		}
		else{
			throw new Error('Factory does not exist');
		}
	};

	var findFactoryIndex = function(factoryName){
		var match = false;
		var matchIndex = -1;
		for (var i = 0; i < factories.length; i++) {
			match = (factories[i].name == factoryName)
			if(match){
				matchIndex = i;
				break;
			}
		}
		if(match){
			return matchIndex;
		}
		else{
			throw new Error('Factory does not exist');
		}
	};
};
