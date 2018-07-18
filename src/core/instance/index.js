// @flow
import { initMixin } from './init';
import { warn } from 'util/index';

function Vue(options: Object) {
  var process: NodeJS.Process;
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
  // console.log(this instanceof Vue);
}

initMixin(Vue);

export default Vue;