/**vue**/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Vue = factory());
}(this, (function () { 'use strict';

    // 
    function noop(a, b, c) {

    }

    function hasOwn(obj, key) {
        return obj.hasOwnProperty(key);
    }


    function makeMap(str, toLowerCase) {
        const map = Object.create(null);

        let list = str.split(',');

        list.map(val => map[val] = true);

        return toLowerCase ? key => map[key.toLowerCase()] : key => map[key];
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

    function isReservedTag(str){
        // return true;

        return isHtmlTag(str);
    }

    const isHtmlTag = makeMap('html,body,base,head,link,meta,style,title,' +
    'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
    'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
    'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
    's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
    'embed,object,param,source,canvas,script,noscript,del,ins,' +
    'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
    'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
    'output,progress,select,textarea,' +
    'details,dialog,menu,menuitem,summary,' +
    'content,element,shadow,template,blockquote,iframe,tfoot');

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

    function callHook(vm, hook){
        const handlers = vm.$options[hook];
        if(handlers){
            let h;
            for(h of handlers.values()){
                try{
                    h.call(vm);
                }catch(e){
                    console.log(e);
                }
            }
        }
        // debugger;
    }

    // 

    const normalizeEvent = (name) => {
        const passive = name.charAt(0) === '&';
        name = passive ? name.slice(1) : name;
        const once = name.charAt(0) === '~';
        name = once ? name.slice(1) : name;
        const capture = name.charAt(0) === '!';
        name = capture ? name.slice(1) : name;

        return {
            name,
            once,
            capture,
            passive
        };
    };

    function updateListeners(on, oldOn, add, remove, vm) {
        let name, def, cur, old, event;

        for (name in on) {
            def = cur = on[name];
            old = oldOn[name];

            event = normalizeEvent(name);

            add(event.name, cur, event.once, event.capture, event.passive, event.params);
        }
    }

    // 

    function initEvents(vm) {
        vm._events = Object.create(null);
        vm._hasHookEvent = false;

        const listeners = vm.$options._parentListeners;

        if (listeners) {
            updateComponentListeners(vm, listeners);
        }
    }
    let target;

    function add(event, fn, once) {
        if (once) {
            target.$once(event, fn);
        } else {
            target.$on(event, fn);
        }
    }

    function remove(event,fn){
        target.$remove(event, fn);
    }

    function updateComponentListeners(vm, listeners) {
        target = vm;
        updateListeners(listeners, {}, add, remove, vm);
        target = undefined;
    }

    // 
    class Vnode{
        
        constructor(tag){
            this.tag = tag;
        }
    }

    // 

    function createElement() {


        return _createElement();
    }

    function _createElement(context, tag) {


        let vnode;

        if (typeof tag === 'string') {
            if(isReservedTag(tag)){
                console.log(true);
                vnode = new Vnode();
            }
        }

        return vnode;
    }

    //  


    function initRender(vm){
        vm._vnode = null; //子树的根
        vm._staticTrees = null;

        const options = vm.$options;
        const parentVnode = vm.$vnode = options._parentVnode;
        const renderContext = parentVnode && parentVnode.context;

        createElement();
    }

    // 

    function initMixin(Vue) {
        Vue.prototype._init = function (options) {
            const vm = this;

            vm._isVue = true;

            vm.$options = mergeOptions({}, options || {});

            // console.log(vm.$options);
            vm._self = vm;

            initLifecycle(vm);
            initEvents(vm);
            initRender(vm);
            callHook(vm, 'beforeCreate');
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
