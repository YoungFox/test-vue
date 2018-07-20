// @flow
export function noop(a?: any, b?: any, c?: any) {

}

export function hasOwn(obj: Object, key: string): boolean {
    return obj.hasOwnProperty(key);
}


export function makeMap(str: string, toLowerCase: boolean): Function {
    const map = Object.create(null);

    let list = str.split(',');

    list.map(val => map[val] = true);

    return toLowerCase ? key => map[key.toLowerCase()] : key => map[key];
}

export const emptyObject = Object.freeze({});