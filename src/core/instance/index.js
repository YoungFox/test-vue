import {warn} from 'util/index'

function Vue(options) {
	if(process.env !== 'production' && !(this instanceof Vue)){
		console.log('Vue is a constructor and should be called by the `new` keyword');
	}

	// console.log(this instanceof Vue);
}


export default Vue;