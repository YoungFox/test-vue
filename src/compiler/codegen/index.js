// @flow
export function generate(ast: ASTElememnt): Object{
    const code = ast ? genElement(ast) : '_c("div")';

    return {
        render: `with(this){return ${code}}`
    };
}

export function genElement(el: ASTElement): string{

    let code;

    const children = genChildren(el);
    
    code = `_c('${el.tag}',${children})`;

    return code;
}

export function genChildren(el): string{

    const children = el.children;

    if(children && children.length){
        return `[${children.map(c => genElement(c)).join(',')}]`;
    }
}