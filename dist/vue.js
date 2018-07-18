/**vue**/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Vue = factory());
}(this, (function () { 'use strict';

    // 
    function noop(a, b, c) {

    }

    function hasOwn(obj,key){
        return obj.hasOwnProperty(key);
    }

    // 

    let warn = noop;

    warn = (msg) => {
    	console.log(`[Vue warn]:${msg}`);
    };

    var config = {
        optionMergeStrategies : Object.create(null)
    };

    // 

    function defaultStrategy(parentVal, childVal) {
        return childVal === undefined ? parentVal : childVal;
    }

    function mergeOptions(parent, child) {

        let i;
        let options = {};

        for (i in parent) {
            mergeField(i);
        }

        for (i in child) {
            if (!hasOwn(parent, i)) {
                mergeField(i);
            }
        }


        function mergeField(key) {
            const stra = config.optionMergeStrategies[key] || defaultStrategy;
            options[key] = stra(parent[key], child[key]);
        }

        return options;

    }

    // 
    function initLifecycle(vm) {
        let options = vm.$options;

        let parent = options.parent;

        if (parent) {
            parent.$children.push(vm);
        }

        vm.$parent = parent;
        vm.$root = parent ? parent.$root : vm;
        vm.$children = [];

        // 这啥？
        vm.$refs = [];

        vm._watcher = null;
        vm._inactive = null;
        vm._directInactive = false;
        vm._isMounted = false;
        vm._isDestroyed = false;
        vm._isBeginDestroyed = false;
    }

    // 

    function initMixin(Vue) {
        Vue.prototype._init = function (options) {
            const vm = this;

            vm._isVue = true;

            vm.$options = mergeOptions({}, options || {});

            console.log(vm.$options);
            vm._self = vm;
            

            initLifecycle(vm);
        };
    }

    // 

    function Vue(options) {
      if (!(this instanceof Vue)
      ) {
        warn('Vue is a constructor and should be called with the `new` keyword');
      }
      this._init(options);
      // console.log(this instanceof Vue);
    }

    initMixin(Vue);

    return Vue;

})));
