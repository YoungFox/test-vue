// @flow
import {parse} from './parser/index';
import { generate } from './codegen/index';
import { codeToFunction } from './to-function';

export default function baseCompile(template): Object{
    const ast = parse(template.trim());

    const code = generate(ast);
    console.log(code);

    return {
        ast: ast,
        render: codeToFunction(code.render),
        staticRenderFns: null
    };
}