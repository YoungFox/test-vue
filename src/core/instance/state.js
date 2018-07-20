// @flow

import { defineReactive } from '../observer/index';


export function initState(vm) {
    vm._watchers = [];
    const options = vm.$options;

    if (options.props) initProps(vm, options.props);
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