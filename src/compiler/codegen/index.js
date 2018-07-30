// @flow
export function generate(ast: ASTElememnt): Object{
    const code = '_c("div")';

    return {
        render: `with(this){return ${code}}`
    };
}