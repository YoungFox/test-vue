// @flow
import { renderList } from './render-list';
import { createTextNode } from 'core/vdom/vnode';
import { toString } from 'shared/util';

export function installRenderHelpers(target: any) {
    target._l = renderList;
    target._v = createTextNode;
    target._s = toString;
}