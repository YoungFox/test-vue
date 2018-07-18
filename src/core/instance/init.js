// @flow

import { mergeOptions } from '../util/index';

export function initMixin(Vue: Class<Component>) {
    Vue.prototype._init = function (options: Object) {
        const vm: Component = this;

        vm._isVue = true;

        vm.$options = mergeOptions({}, options || {});

        console.log(vm.$options);
        vm._self = vm;
    };
}