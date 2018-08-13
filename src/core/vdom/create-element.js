// @flow
// import {config} from '../config';
import { isReservedTag } from 'web/util/element';
import Vnode from './vnode';
import { createEmptyNode } from './vnode';

export function createElement(context, tag, data, children): Vnode {
    return _createElement(undefined, tag, data, children);
}

export function _createElement(context, tag, data, children): Vnode {


    let vnode, ns;

    if (typeof tag === 'string') {
        if (isReservedTag(tag)) {
            vnode = new Vnode(tag, data, children);
        }
    }
    return vnode ? vnode : createEmptyNode();
}