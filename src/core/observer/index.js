// @flow
import Dep from './dep';

export function defineReactive(obj: Object, key: string, val: any, customSetter: Function) {
    const dep = new Dep;

    const property = Object.getOwnPropertyDescriptor(obj, key);

    if (property && property.configurable === false) {
        return;
    }

    const getter = property && property.get;
    const setter = property && property.set;

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