// @flow
import {warn} from './debug';

export function logError(err, vm, info) {
    if (process.env.NODE_ENV !== 'production') {
        warn(`Error in ${info}: "${err.toString()}"`, vm);
    }
}