// @flow
import Dep from './dep';

import { def } from '../util/index';


export class Observer {
    value: any;

    constructor(value) {
        this.value = value;
        this.dep = new Dep();
        def(value, '__ob__', this);

        this.walk(value);
    }

    walk(obj: Object) {
        const keys = Object.keys(obj);

        for (let k of keys) {
            defineReactive(obj, k);
        }
    }
}



export function defineReactive(obj: Object, key: string, val: any, customSetter: Function) {
    const dep = new Dep;

    const property = Object.getOwnPropertyDescriptor(obj, key);

    if (property && property.configurable === false) {
        return;
    }

    const getter = property && property.get;
    const setter = property && property.set;

    if ((!getter || setter) && arguments.length === 2) {
        val = obj[key];
    }

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            const value = getter ? getter.call(obj) : val;
            if (Dep.target) {
                dep.depend();
            }

            return value;
        },
        set: function (newVal) {
            const value = getter ? getter.call(obj) : val;
            if (value === newVal) {
                return;
            }

            if (customSetter) {
                customSetter();
            }

            if (setter) {
                setter.call(obj);
            } else {
                val = newVal;
            }

            dep.notify();
        }
    });
}


export function observe(value) {
    let ob;
    ob = new Observer(value);
    return ob;
}