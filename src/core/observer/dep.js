// @flow

export default class Dep {

    constructor() {
        this.subs = [];
    }
    depend() {
        if (Dep.target) {
           this.subs.push(Dep.target); 
        }
    }


    notify() {
        let watcher;
        for (watcher of this.subs) {
            watcher.update();
        }
    }
}

Dep.target = null;
const targetStack = [];

export function pushTarget(target: ?Watcher) {
    if (Dep.target) targetStack.push(Dep.target);
    Dep.target = target;
}

export function popTarget(){
    Dep.target = targetStack.pop();
}