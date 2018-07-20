// @flow 
import { createElement } from '../vdom/create-element';
import { defineReactive } from '../observer/index';
import { emptyObject } from '../util/index';
import { warn } from '../util/index';

export function initRender(vm: Component){
    vm._vnode = null; //子树的根
    vm._staticTrees = null;

    const options = vm.$options;
    const parentVnode = vm.$vnode = options._parentVnode;
    const renderContext = parentVnode && parentVnode.context;
    // createElement();
    vm._c = createElement();


    defineReactive(vm, '$attr', emptyObject ,function (){
        warn('$attr是只读属性');
    });
    // vm.
}