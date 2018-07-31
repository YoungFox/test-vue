// @flow
import {logError} from '../util/error';
import Watcher from '../observer/watcher';

export function initLifecycle(vm: Component) {
    let options = vm.$options;

    let parent = options.parent;

    if (parent) {
        parent.$children.push(vm);
    }

    vm.$parent = parent;
    vm.$root = parent ? parent.$root : vm;
    vm.$children = [];

    // 这啥？
    vm.$refs = [];

    vm._watcher = null;
    vm._inactive = null;
    vm._directInactive = false;
    vm._isMounted = false;
    vm._isDestroyed = false;
    vm._isBeginDestroyed = false;
}

export function lifecycleMixin(Vue){
    Vue.prototype._update = function (vnode){
        const vm = this;
        const prevVnode = vm._vnode; 
        vm._vnode = vnode;

        // 
        if(!prevVnode){
            vm.$el = vm.__patch__(vm.$el,vnode);
        }
    };
}

export function callHook(vm, hook){
    const handlers = vm.$options[hook];
    if(handlers){
        let h;
        for(h of handlers.values()){
            try{
                h.call(vm);
            }catch(e){
                // console.log(e);
                logError(e, vm, `${hook} hook`);
            }
        }
    }
    // debugger;
}

export function mountComponent(vm,el){
    callHook(vm, 'beforeMount');
    const vnode = vm._render();
    vm.$el = el;

    console.log(vnode);
    function updateComponent(){
        vm._update(vnode);
    }

    new Watcher(vm, updateComponent);

}