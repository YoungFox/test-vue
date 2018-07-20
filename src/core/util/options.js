// @flow
import config from '../config';
import { hasOwn } from 'shared/util';

function defaultStrategy(parentVal: any, childVal: any): any {
    return childVal === undefined ? parentVal : childVal;
}

export function mergeOptions(parent: Object, child: Object): Object {

    let i;
    let options = {};

    for (i in parent) {
        mergeField(i);
    }

    for (i in child) {
        if (!hasOwn(parent, i)) {
            mergeField(i);
        }
    }


    function mergeField(key: string) {
        const stra = config.optionMergeStrategies[key] || defaultStrategy;
        options[key] = stra(parent[key], child[key]);
    }

    return options;

}