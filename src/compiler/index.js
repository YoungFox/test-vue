// @flow
import {parse} from './parser/index';

export default function baseCompile(template): Object{
    const ast = parse(template.trim());
    // console.log(`ast:${ast('script')}`);
    return {
        ast: null,
        render: 1234,
        staticRenderFns: null
    };
}