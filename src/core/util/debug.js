// @flow
import {noop} from 'shared/util';

export let warn = noop;

warn = (msg: string) => {
	console.log(`[Vue warn]:${msg}`);
};