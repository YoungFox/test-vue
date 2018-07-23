// @flow
import Dep, { pushTarget, popTarget } from './dep';

export default class Watcher {
    vm: Component;
    expression: string;
    cb: Function;
    constructor(vm, expOrFn, cb) {
        this.vm = vm;
        vm.watchers.push(this);

        if (typeof expOrFn === 'function') {
            this.getter = expOrFn;
        } else {
            this.getter = expOrFn;
        }

        this.value = this.get();
    }

    get(): any{
        pushTarget(this);
        const vm = this.vm;
        let value;

        try{
            value = this.getter();
        }catch(e){
            console.log(e);
        }finally{
            popTarget();
        }
        return value;
    }
}