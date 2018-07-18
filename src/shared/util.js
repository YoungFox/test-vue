// @flow
export function noop(a?: any, b?: any, c?: any) {

}

export function hasOwn(obj: Object,key: string): boolean{
    return obj.hasOwnProperty(key);
}