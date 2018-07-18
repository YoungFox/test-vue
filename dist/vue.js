/**vue**/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vue = factory());
}(this, (function () { 'use strict';

	// 

	function noop(a, b, c) {}

	// 

	let warn = noop;

	warn = (msg) => {
		console.log(`[Vue warn]:${msg}`);
	};

	function Vue(options) {
		if (!(this instanceof Vue)
	  ) {
	    warn('Vue is a constructor and should be called with the `new` keyword');
	  }

		// console.log(this instanceof Vue);
	}

	return Vue;

})));
