module.exports = function(factoryName, newObject, model, factories){
	var newModel = model.create(newObject);
	if(newModel instanceof Error){
		throw newModel;
	}
	else{
		factories.push({name: factoryName, model: newModel});
	}
};
