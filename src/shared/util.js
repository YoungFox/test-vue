// @flow
export function noop(a?: any, b?: any, c?: any) {

}

export function hasOwn(obj: Object, key: string): boolean {
    return obj.hasOwnProperty(key);
}


export function makeMap(str: string, toLowerCase: boolean): Function {
    const map = Object.create(null);

    let list = str.split(',');

    list.map((val: any): any => map[val] = true);

    return toLowerCase ? (key: any): any => map[key.toLowerCase()] : (key: any): any => map[key];
}

export const emptyObject = Object.freeze({});

function nativeBind(fn: Function, ctx: Object): Function {
    return fn.bind(ctx);
}

function polyfillBind(fn: Function, ctx: Object): Function {
    function boundFn(a: any): any {
        const l = arguments.length;
        return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
    }

    return boundFn;
}

export const bind = Function.prototype.bind ? nativeBind : polyfillBind;


export function isUndef(v: any): boolean {
    return v === undefined || v === null;
}

export function isDef(v: any): boolean {
    return v !== undefined && v !== null;
}