// @flow
export default class Vnode {
    tag: string;
    data: any;
    children: Array;
    elm: elm;
    text: text;
    constructor(tag, data, children, elm, text) {
        this.tag = tag;
        this.data = data;
        this.children = children;
        this.elm = elm;
        this.text = text;
    }
}

export function createTextNode(val: string): Vnode {
    if (val) {
        return new Vnode(undefined, undefined, undefined, undefined, String(val));
    } else {
        return createEmptyNode();
    }
}

export function createEmptyNode() {
    return new Vnode(undefined, undefined, undefined, undefined, '');
}