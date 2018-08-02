// @flow

import { defineReactive, observe } from '../observer/index';
import { warn, noop, hasOwn, bind, isReserved } from '../util/index';
import Watcher from '../observer/watcher';

export function initState(vm) {
    vm._watchers = [];
    const options = vm.$options;

    if (options.props) initProps(vm, options.props);
    if (options.methods) initMethods(vm, options.methods);
    if (options.data) {
        initData(vm);
    } else {
        observe(vm._data = {});
    }

    // placeholder  computed

    if (options.watch) {
        initWatch(vm, options.watch);
    }
}

function initProps(vm, propsOptions) {
    const propsData = vm.$options.propsData || {};

    const props = vm._props = {};

    const keys = vm.$options._propKeys = [];

    for (let key in propsOptions) {
        keys.push(key);

        var value = propsOptions[key];

        defineReactive(props, key, value, function () {
            console.log('observe props');
        });
    }

}

function initMethods(vm: Compnent, methods: Object) {
    const props = vm.$options.props;
    for (let key of Object.keys(methods)) {
        if (process.env.NODE_ENV !== 'production') {
            if (methods[key] == null) {
                warn(`Method ${key}方法未定义`);
            }
            if (props && hasOwn(props, key)) {
                warn('方法名已被props占用');
            }
            if ((key in vm) && isReserved(key)) {
                warn('不要使用$或_开头的变量定义方法');
            }
        }
        vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    }
}

function initData(vm: Compnent) {
    const data = vm.$options.data;
    vm._data = data;
    let keys = Object.keys(data);

    for (let i of keys) {

        // Object.defineProperty(vm, i, data[i]);
        proxy(vm, '_data', i);
    }

    observe(data);
}

function proxy(target, sourceKey, key) {
    let sharedPropertyDefinition = {
        enumrable: true,
        configurable: true,
        get: noop,
        set: noop
    };

    sharedPropertyDefinition.get = function () {
        // debugger;
        // console.log('ggggggg');
        return this[sourceKey][key];
    };
    sharedPropertyDefinition.set = function (val) {
        this[sourceKey][key] = val;
    };

    Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initWatch(vm, watch) {
    for (const key of Object.keys(watch)) {
        const handler = watch[key];
        createWatcher(vm, key, handler);
    }
}

function createWatcher(vm, expOrFn, handler) {
    return vm.$watch(expOrFn, handler);
}

// placeholder Watcher