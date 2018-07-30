// @flow
import {parse} from './parser/index';
import { generate } from './codegen/index';

export default function baseCompile(template): Object{
    const ast = parse(template.trim());

    const code = generate(ast);

    return {
        ast: null,
        render: code.render,
        staticRenderFns: null
    };
}