// @flow
export default class Vnode{
    tag: string;
    children: Array;
    constructor(tag,children){
        this.tag = tag;
        this.children = children;
    }
} 