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

function genText(el){
    let text = '';
    if(el.type === 2){
        text =el.expression.trim();
    }else{
        text =el.text.trim(); 
    }

    let code = `_v(${text})`;
    return code;
}

export function genChildren(el): string{

    const children = el.children;

    if(children && children.length){
        return `[${children.map(c => genNode(c)).join(',')}]`;
    }
}

function genNode(el){
    if(el.type === 1){
        return genElement(el);
    }else if(el.type === 2 || el.type === 3){
        return genText(el);
    }
}