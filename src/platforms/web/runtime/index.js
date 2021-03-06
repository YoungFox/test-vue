// @flow
import Vue from 'core/index';
import { query } from 'web/util/index';
import { inBrowser } from 'core/util/env';
import { mountComponent } from 'instance/lifecycle';
import { patch } from './patch';

export default Vue;

Vue.prototype.__patch__ = patch;

Vue.prototype.$mount = function (el,
    hydrating): Component {
    el = (el && inBrowser) ? query(el) : undefined;

    // console.log(this);
    // console.log(this.$options.render.call(this));
    return mountComponent(this, el, hydrating);
};