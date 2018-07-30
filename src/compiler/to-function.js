// @flow
import { warn } from 'util/index';
import { noop } from 'shared/util';

function codeToFunction(code: string): Function {
    try {
        return new Function(code);
    } catch (e) {
        warn(e);
        return noop;
    }
}

export { codeToFunction };