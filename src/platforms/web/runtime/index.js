// @flow
import Vue from 'core/index';

export default Vue;

Vue.prototype.$mount = function (){
    console.log('rrrrrrr');
};

Vue.prototype.$mount = function (el,
    hydrating): Component{

}