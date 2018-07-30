// @flow

import { mergeOptions } from '../util/index';
import { initLifecycle, callHook } from './lifecycle.js';
import { initEvents } from './events';
import { initRender } from './render';
import { initState } from './state';
import { mark, measure } from '../util/perf';
import config from '../config';

let uid = 0;

export function initMixin(Vue: Class<Component>) {
    Vue.prototype._init = function (options: Object) {
        const vm: Component = this;

        let startTag, endTag;

        vm._uid = uid++;

        if (process.env.NODE_ENV !== 'production' && config.perfomance && mark) {
            startTag = `Vue perf start:${startTag}`;
            endTag = `Vue perf start:${endTag}`;
            mark(startTag);
        }

        vm._isVue = true;

        vm.$options = mergeOptions({}, options || {});

        vm._self = vm;

        initLifecycle(vm);
        initEvents(vm);
        initRender(vm);
        callHook(vm, 'beforeCreate');
        initState(vm);
        callHook(vm, 'created');

        if (process.env.NODE_ENV !== 'production' && config.perfomance && mark) {
            mark(endTag);
            measure(`Vue ${vm.$options.name} init`, startTag, endTag);
        }

        vm.$mount(this.$options.el);
    };

}