// @flow
export default class Vnode {
    tag: string;
    children: Array;
    elm: elm;
    constructor(tag, children, elm) {
        this.tag = tag;
        this.children = children;
        this.elm = elm;
    }
} 