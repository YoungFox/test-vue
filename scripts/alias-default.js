const path = require('path');

const resolve = path.resolve;


module.exports = {
	'core': resolve('src/core'),
	'util': resolve('src/core/util'),
	'shared': resolve('src/shared'),
	'web': resolve('src/platforms/web'),
	'compiler': resolve('src/compiler')
};