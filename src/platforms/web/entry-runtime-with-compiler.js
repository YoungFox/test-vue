

import Vue from './runtime/index';

export default Vue;

Vue.prototype.$mount = function (){
    // console.log('cccccccccc');
    const options = this.$options;

    console.log(options);
};