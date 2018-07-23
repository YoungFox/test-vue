// @flow
import { warn } from './debug';

export { warn };

export * from './options';
export * from './element';

export * from 'shared/util';


export function isReserved(str: string): boolean {
    const c = (str + '').charCodeAt(0);
    return c === 0x24 || c === 0x5F;
}

export function def(obj: Object, key: string, val: any, enumerable?: boolean) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    });
}