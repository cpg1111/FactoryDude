# FactoryDude

A Node module to create mongoose objects for test data

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/cpg1111/FactoryDude?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
<img src="https://travis-ci.org/cpg1111/FactoryDude.svg?branch=master" style="float: left;"/>
<img src="https://david-dm.org/cpg1111/FactoryDude.svg" style="float: left;"/>
<a href="http://badge.fury.io/gh/cpg1111%2FFactoryDude"><img src="https://badge.fury.io/gh/cpg1111%2FFactoryDude.svg" style="float: left;" alt="GitHub version" height="18"></a>
<a href="http://badge.fury.io/js/factorydude"><img src="https://badge.fury.io/js/factorydude.svg" alt="npm version" height="18" style="float: left;"></a>

To be used in test suites (<a href="https://github.com/mochajs/mocha">mocha</a>, <a href="https://github.com/chaijs/chai">chai</a>, <a href="https://github.com/jasmine/jasmine">jasmine</a>, etc) for fetures that use <a href="https://github.com/LearnBoost/mongoose">mongoose</a> models.
Inspired by <a href="https://github.com/thoughtbot/factory_girl">factory_girl</a>

### Install

```
	npm  install FactoryDude
```

## Usage

```
	var FactoryDude = require('FactoryDude');
	var factoryDude = new FactoryDude();
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
