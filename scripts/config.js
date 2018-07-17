const path = require('path');
const rollupAlias = require('rollup-plugin-alias');
const flow = require('rollup-plugin-flow-no-whitespace');
const aliasDefault = require('./alias-default.js');


const builds = {
	'web-full-dev': {
		entry: path.resolve('src/platforms/web/entry-runtime-with-compiler.js'),
		dest: path.resolve('dist/vue.js'),
		format: 'umd',
		env: 'development',

	}
}
// console.log(aliasDefault);
function genConfig(name) {
	const opts = builds[name];

	const config = {
		input: opts.entry,
		output: {
			file: opts.dest,
			format: opts.format,
			banner: '/**vue**/',
			name: 'Vue'
		},
		plugins: [flow(), rollupAlias(aliasDefault)]
	}

	return config;
}

// console.log(genConfig(process.env.TARGET));

module.exports = genConfig(process.env.TARGET);