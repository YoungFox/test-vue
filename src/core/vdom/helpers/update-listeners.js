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

export function updateListeners(on: Object, oldOn: Object, add: Function, remove: Function, vm: Component) {
    let name, def, cur, old, event;

    for (name in on) {
        def = cur = on[name];
        old = oldOn[name];

        event = normalizeEvent(name);

        add(event.name, cur, event.once, event.capture, event.passive, event.params);
    }
}