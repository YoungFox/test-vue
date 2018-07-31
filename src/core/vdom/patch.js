import { isUndef, isDef } from 'shared/util';
import { domTools } from 'platforms/web/util/index';
import Vnode from 'core/vdom/vnode';


export function createRealElement(vnode, parentElm) {
    const children = vnode.children;

    const tag = vnode.tag;
    if (isDef(tag)) {
        vnode.elm = domTools.createElement(tag);
    }

    insert(parentElm, vnode.elm);
    debugger;
}

function insert(parent, elm) {
    if (isDef(parent)) {
        domTools.appendChild(parent, elm);
    }
}

export function createPatchFunction(){

    return function patch(oldVnode, vnode) {
        const isRealElement = x => isDef(x.nodeType);
        if (isUndef(oldVnode)) {
            console.log('没有根');
        }else{
            if(isRealElement(oldVnode)){
                console.log('real');
                oldVnode = new Vnode(oldVnode.tagName,[],oldVnode);

                createRealElement(vnode, oldVnode.elm); 
            }
        }
    };
}