
export function addHandler(el, name, value){
    let events = el.events || (el.events = {});

    events[name] = value;
    el.plain = false;
}