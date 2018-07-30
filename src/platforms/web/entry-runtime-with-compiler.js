// @flow

import Vue from './runtime/index';
import { query } from './util/index';
import { warn } from 'util/index';
import compileToFuntions from './compiler/index';


export default Vue;

const mount = Vue.prototype.$mount;

Vue.prototype.$mount = function (el, hydrating): Component {
    const options = this.$options;
    el = el && query(el);

    if (el === document.body || el === document.documentElement) {
        warn('不要将Vue挂载到html或body上');
        return;
    }

    if (!options.render) {
        let template = options.template;
        if (template) {
            console.log('没有模板');
        } else {
            template = getOuterHTML(el);
        }
        if (template) {
            const { render, staticRenderFns } = compileToFuntions(template, {}, this);

            options.render = render;
            open.staticRenderFns = staticRenderFns;

            console.log(render.call(this));
        }
    }

    return mount.call(this, el, hydrating);
};

function getOuterHTML(el): Element {
    return el && el.outerHTML;
}