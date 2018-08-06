// @flow
import { initMixin } from './init';
import { warn } from 'util/index';
import { renderMixin } from './render';
import { lifecycleMixin } from './lifecycle';
import { stateMixin } from './state';

function Vue(options: Object) {
  var process: NodeJS.Process;
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
stateMixin(Vue);

export default Vue;