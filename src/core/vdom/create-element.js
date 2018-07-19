// @flow
// import {config} from '../config';
import {isReservedTag} from '../util/index';
import Vnode from './vnode';

export function createElement(): Vnode {


    return _createElement();
}

export function _createElement(context, tag): Vnode {


    let vnode, ns;

    if (typeof tag === 'string') {
        if(isReservedTag(tag)){
            console.log(true);
            vnode = new Vnode();
        }
    }

    return vnode;
}