// @flow 
import { createElement } from '../vdom/create-element';


export function initRender(vm: Component){
    vm._vnode = null; //子树的根
    vm._staticTrees = null;

    const options = vm.$options;
    const parentVnode = vm.$vnode = options._parentVnode;
    const renderContext = parentVnode && parentVnode.context;

    createElement();
}