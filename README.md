# FactoryDude
A Node module to create mongoose objects for test data

<img src="https://travis-ci.org/cpg1111/FactoryDude.svg?branch=master" style="float: left;"/>
<img src="https://david-dm.org/cpg1111/FactoryDude.svg" style="float: left;"/>

To be used in test suites (<a href="https://github.com/mochajs/mocha">mocha</a>, <a href="https://github.com/chaijs/chai">chai</a>, <a href="https://github.com/jasmine/jasmine">jasmine</a>, etc) for fetures that use <a href="https://github.com/LearnBoost/mongoose">mongoose</a> models.
Inspired by <a href="https://github.com/thoughtbot/factory_girl">factory_girl</a>

### Install

```
	npm  install FactoryDude
```

## Usage

```
	var FactoryDude = require('FactoryDude');
	factoryDude = new FactoryDude();
```

### Create a Factory

```
	var newFixtureModel = factoryDude.factory(
		<model name>,
		<path to require model>,
		<object with model attributes to create>
	);
	/*
	 * returns a mongoose model that has been saved in the database
	 * and can be used just as any other mongoose models.
	 */
```

### Reference one factory in another factory
```
	factoryDude.reference(<name of model to reference>, <attribute to reference>);
```

```
	var firstFixtureModel = factoryDude.factory(
		'firstModel',
		'./path/to/model',
		{name: 'test', number: 1}
	);
	//creates a model with the name test and a number 1

	var secondFixtureModel = factoryDude.factory(
		'secondModel',
		'./path/to/model',
		{name: factoryDude.reference('firstModel', 'name'), number: 2}
	);
	//creates a model with the name test and a number 2
```

### Destroy a factory model that was already created
```
	factoryDude.destroy(<name of model>);
```

```
	var firstFixtureModel = factoryDude.factory(
		'firstModel',
		'./path/to/model',
		{name: 'test', number: 1}
	);

	factoryDude.destroy('firstModel'); //'firstModel' is no longer in the database or a fixture
```

## License
FactoryDude is licensed under the apache license.
