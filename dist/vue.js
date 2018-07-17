/**vue**/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vue = factory());
}(this, (function () { 'use strict';

	//

	//

	function Vue(options) {
		if(process.env !== 'production' && !(this instanceof Vue)){
			console.log('Vue is a constructor and should be called by the `new` keyword');
		}

		// console.log(this instanceof Vue);
	}

	return Vue;

})));
