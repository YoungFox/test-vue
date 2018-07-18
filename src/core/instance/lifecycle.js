// @flow
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
