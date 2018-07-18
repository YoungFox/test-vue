import {warn} from 'util/index'

function Vue(options) {
	if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }

	// console.log(this instanceof Vue);
}


export default Vue;