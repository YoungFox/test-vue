export function genHandlers(events) {
    let data = `'on':{`;
    for (let i in events) {
        data += genHandler(i, events[i]);
    }
    data += '}';
    return data;
}

function genHandler(name, value) {
    let data = {};
    data[name] = value;

    return `'${name}':${value},`;
}