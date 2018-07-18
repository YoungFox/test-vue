// @flow

import {updateListeners} from '../vdom/helpers/index';

export function initEvents(vm: Component) {
    vm._events = Object.create(null);
    vm._hasHookEvent = false;

    const listeners = vm.$options._parentListeners;

    if (listeners) {
        updateComponentListeners(vm, listeners);
    }
}
let target: any;

function add(event: string, fn: Function, once: boolean) {
    if (once) {
        target.$once(event, fn);
    } else {
        target.$on(event, fn);
    }
}

function remove(event: string,fn: Function){
    target.$remove(event, fn);
}

function updateComponentListeners(vm: Component, listeners: Object) {
    target = vm;
    updateListeners(listeners, {}, add, remove, vm);
    target = undefined;
}


