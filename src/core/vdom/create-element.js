// @flow
// import {config} from '../config';
import { isReservedTag } from 'web/util/element';
import Vnode from './vnode';

export function createElement(context, tag, children): Vnode {
    return _createElement(undefined, tag, children);
}

export function _createElement(context, tag, children): Vnode {


    let vnode, ns;

    if (typeof tag === 'string') {
        if (isReservedTag(tag)) {
            vnode = new Vnode(tag, children);
        }
    }
    return vnode;
}