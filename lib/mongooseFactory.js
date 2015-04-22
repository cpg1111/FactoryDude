module.exports = function(factoryName, newObject, model, factories, hasAttribute){
	var newModel = new model();
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
