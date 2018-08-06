// @flow
import Dep, { pushTarget, popTarget } from './dep';

function getValueFunction(x){
    return function(obj){
        return obj[x];
    }
}

export default class Watcher {
    vm: Component;
    expOrFn: string;
    cb: Function;
    constructor(vm, expOrFn, cb) {
        this.vm = vm;
        this.cb = cb;
        vm._watchers.push(this);

        if (typeof expOrFn === 'function') {
            this.getter = expOrFn;
        } else {
            this.getter = getValueFunction(expOrFn);
        }
        this.value = this.get();
    }

    get(): any {
        pushTarget(this);
        const vm = this.vm;
        let value;
        try {
            value = this.getter.call(vm, vm);
            // debugger;
        } catch (e) {
            console.log(e);
        } finally {
            popTarget();
        }
        return value;
    }

    update() {
        // debugger;
        const vm = this.vm;
        if(this.cb){
            this.cb();
        }
        this.getter.call(vm, vm);
    }
}