// @flow
import {renderList} from './render-list';

export function installRenderHelpers(target: any){
    target._l = renderList;
}