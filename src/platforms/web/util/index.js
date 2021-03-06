// @flow

import { warn } from 'core/util/index';

export * from './element';

export function query(el: string | Element): Element {
    if (typeof el === 'string') {
        const selected = document.querySelector(el);
        if (!selected) {
            process.env.NODE_ENV && warn(`未找到元素：${el}`);
            return document.createElement('div');
        }
        return selected;
    } else {
        return el;
    }

}


export * from './dom';