// @flow
import { isUndef, isDef } from 'shared/util';
import { domTools } from 'platforms/web/util/index';
import Vnode from 'core/vdom/vnode';


export function createRealElement(vnode, parentElm, refElm) {
    if (!vnode) {
        return;
    }
    const children = vnode.children;

    const tag = vnode.tag;
    if (isDef(tag)) {
        vnode.elm = domTools.createElement(tag);
    }

    if (children) {
        createChildrenRealElement(vnode, children);
    }
    insert(parentElm, vnode.elm, refElm);
}

function createChildrenRealElement(vnode, children) {
    if (Array.isArray(children)) {
        for (let c of children) {
            createRealElement(c, vnode.elm);
        }
    }
}

function insert(parent, elm, refElm) {
    if (isDef(parent)) {
        domTools.insertBefore(parent, elm, refElm);
    }
}

function removeVnodes(vnode) {
    if (vnode.elm) {
        removeNode(vnode.elm);
    }
}

function removeNode(el) {
    let parentElm = domTools.parentNode(el);
    domTools.removeChild(parentElm, el);
}

export function createPatchFunction(): any {

    return function patch(oldVnode, vnode) {
        const isRealElement = x => isDef(x.nodeType);
        if (isUndef(oldVnode)) {
            console.log('没有根');
        } else {
            if (isRealElement(oldVnode)) {
                console.log('real');
                oldVnode = new Vnode(oldVnode.tagName, [], oldVnode);
                let parentElm = domTools.parentNode(oldVnode.elm);
                createRealElement(vnode, parentElm, oldVnode.elm);

                if (isDef(parentElm)) {
                    removeVnodes(oldVnode);
                }
            }
        }
    };
}