// @flow

import { mergeOptions } from '../util/index';
import { initLifecycle, callHook } from './lifecycle.js';
import { initEvents } from './events';
import { initRender } from './render';

export function initMixin(Vue: Class<Component>) {
    Vue.prototype._init = function (options: Object) {
        const vm: Component = this;

        vm._isVue = true;

        vm.$options = mergeOptions({}, options || {});

        // console.log(vm.$options);
        vm._self = vm;

        initLifecycle(vm);
        initEvents(vm);
        initRender(vm);
        callHook(vm, 'beforeCreate');
    };
}