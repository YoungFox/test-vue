// @flow 
import { createElement } from '../vdom/create-element';
import { defineReactive } from '../observer/index';
import { emptyObject } from '../util/index';
import { warn } from '../util/index';
import { installRenderHelpers } from './render-helpers/index';

export function initRender(vm: Component) {
    vm._vnode = null; //子树的根
    vm._staticTrees = null;

    const options = vm.$options;
    const parentVnode = vm.$vnode = options._parentVnode;
    const renderContext = parentVnode && parentVnode.context;
    // createElement();
    vm._c = (tag, children) => createElement(vm, tag, children);


    defineReactive(vm, '$attr', emptyObject, function () {
        warn('$attr是只读属性');
    });
    // vm.
}


export function renderMixin(vm: Component) {
    installRenderHelpers(vm.prototype);

    vm.prototype._render = function () {
        let vm = this;
        let vnode;
        const { render } = vm.$options;
        try {
            vnode = render.call(this);
        } catch (e) {
            warn(e);
        }

        return vnode;
    };
}