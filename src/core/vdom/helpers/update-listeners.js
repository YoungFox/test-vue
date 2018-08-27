// @flow

const normalizeEvent = (name: string): {
    name: string,
    once: boolean,
    capture: boolean,
    passive: boolean,
    handler?: Function,
    params?: Array<any>
} => {
    const passive = name.charAt(0) === '&';
    name = passive ? name.slice(1) : name;
    const once = name.charAt(0) === '~';
    name = once ? name.slice(1) : name;
    const capture = name.charAt(0) === '!';
    name = capture ? name.slice(1) : name;

    return {
        name,
        once,
        capture,
        passive
    };
};

function add(target, event, handler) {
    target.addEventListener(event, handler);
}


export function updateListeners(target, on: Object, oldOn: Object) {
    let name, def, cur, old, event;
    for (name in on) {
        def = cur = on[name];
        // old = oldOn[name];

        event = normalizeEvent(name);

        add(target, event.name, cur, event.once, event.capture, event.passive, event.params);
    }
}