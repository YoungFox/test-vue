
const defaultExpReg = /\{\{(.)+?\}\}/;

export function parseText(text){

    let match = text.match(defaultExpReg);
    let expression;
    if(match){
        expression = `_s(${match[1].trim()})`;
    }
    return {expression};
}