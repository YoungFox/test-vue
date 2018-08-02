// @flow
export default class Vnode {
    tag: string;
    children: Array;
    elm: elm;
    text: text;
    constructor(tag, children, elm, text) {
        this.tag = tag;
        this.children = children;
        this.elm = elm;
        this.text = text;
    }
}

export function createTextNode(val: string): Vnode {
    return new Vnode(undefined, undefined, undefined, String(val));
}

export function createEmptyNode() {
    return new Vnode(undefined, undefined, undefined, '');
}