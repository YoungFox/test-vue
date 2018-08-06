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
    } else if (vnode.expression && vnode.type === 2) {
        vnode.elm = domTools.createTextNode(vnode.expression);
    } else if (vnode.text) {
        vnode.elm = domTools.createTextNode(vnode.text);
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

    if (isDef(parent) && isDef(elm)) {
        domTools.insertBefore(parent, elm, refElm);
    }
}


function removeNode(el) {
    if (el.nodeType) {
        let parentElm = domTools.parentNode(el);
        domTools.removeChild(parentElm, el);
    }
}

function sameVnode(a, b) {
    return a.tag === b.tag;
}

function patchVnode(oldVnode, vnode) {
    if (oldVnode === vnode) {
        return;
    }

    const elm = vnode.elm = oldVnode.elm;

    const ch = vnode.children;
    const oldCh = oldVnode.children;
    if (isUndef(vnode.text)) {
        if (isDef(ch) && isDef(oldCh)) {
            updateChildren(elm, oldCh, ch);
        }
    } else {
        if (isDef(elm)){
            domTools.setTextContent(elm, vnode.text);
        }
    }


}

function updateChildren(parentElm, oldCh, ch) {
    let oldStartIndex = 0;
    let oldEndIndex = oldCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIndex];

    let newStartIndex = 0;
    let newEndIndex = ch.length - 1;
    let newStartVnode = ch[0];
    let newEndVnode = ch[oldEndIndex];

    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        oldStartVnode = oldCh[oldStartIndex];
        oldEndVnode = oldCh[oldEndIndex];
        newStartVnode = ch[newStartIndex];
        newEndVnode = ch[newEndIndex];

        if (sameVnode(oldStartVnode, newStartVnode)) {
            patchVnode(oldStartVnode, newStartVnode);
            ++oldStartIndex;
            ++newStartIndex;
        } else if (sameVnode(oldEndVnode, newEndVnode)) {
            patchVnode(oldEndVnode, newEndVnode);
            --oldEndIndex;
            --newEndIndex;
        } else if (sameVnode(oldStartVnode, newEndVnode)) {
            patchVnode(oldStartVnode, newEndVnode);
            domTools.insertBefore(parentElm, oldStartVnode.elm, domTools.nextSibling(oldEndVnode.elm));
            ++oldStartIndex;
            --newEndIndex;
        } else if (sameVnode(oldEndVnode, newStartVnode)) {
            patchVnode(oldEndVnode, newStartVnode);
            domTools.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
            ++oldStartIndex;
            --newEndIndex;
        } else {
            createRealElement(newStartVnode, parentElm, oldStartVnode.elm);
            ++oldStartIndex;
        }
    }

    if (oldStartIndex > oldEndIndex) {
        addVnodes(parentElm, oldStartVnode.elm, ch, newStartIndex, newEndIndex);
    } else if (newStartIndex > newEndIndex) {
        removeVnodes(oldCh, oldStartIndex, oldEndIndex);
    }
}

function addVnodes(parentElm, refElm, vnodes, startIndex, endIndex) {
    for (; startIndex <= endIndex; startIndex++) {
        createRealElement(vnodes[startIndex], parentElm, refElm);
    }
}

function removeVnodes(vnodes, startIndex, endIndex) {
    // if (vnode.elm) {
    for (; startIndex <= endIndex; startIndex++) {
        removeNode(vnodes[startIndex].elm);
    }
}

export function createPatchFunction(): any {

    return function patch(oldVnode, vnode) {
        const isRealElement = x => isDef(x.nodeType);

        if (isUndef(oldVnode)) {
            console.log('没有根');
        } else {
            if (!isRealElement(oldVnode) && sameVnode(oldVnode, vnode)) {
                patchVnode(oldVnode, vnode);
            } else {
                if (isRealElement(oldVnode)) {
                    oldVnode = new Vnode(oldVnode.tagName, [], oldVnode);

                }

                let parentElm = domTools.parentNode(oldVnode.elm);
                createRealElement(vnode, parentElm, oldVnode.elm);

                if (isDef(parentElm)) {
                    removeVnodes([oldVnode], 0, 0);
                }
            }
        }
    };
}