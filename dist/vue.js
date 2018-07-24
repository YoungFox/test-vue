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

    const emptyObject = Object.freeze({});

    function nativeBind(fn, ctx) {
        return fn.bind(ctx);
    }

    function polyfillBind(fn, ctx) {
        function boundFn(a) {
            const l = arguments.length;
            return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
        }

        return boundFn;
    }

    const bind = Function.prototype.bind ? nativeBind : polyfillBind;

    // 

    let warn = noop;

    warn = (msg) => {
    	console.log(`[Vue warn]:${msg}`);
    };

    var config = {
        optionMergeStrategies : Object.create(null),
        perfomance: true
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


    function isReserved(str) {
        const c = (str + '').charCodeAt(0);
        return c === 0x24 || c === 0x5F;
    }

    function def(obj, key, val, enumerable) {
        Object.defineProperty(obj, key, {
            value: val,
            enumerable: !!enumerable,
            writable: true,
            configurable: true
        });
    }

    // 

    function logError(err, vm, info) {
        {
            warn(`Error in ${info}: "${err.toString()}"`, vm);
        }
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

    function callHook(vm, hook){
        const handlers = vm.$options[hook];
        if(handlers){
            let h;
            for(h of handlers.values()){
                try{
                    h.call(vm);
                }catch(e){
                    // console.log(e);
                    logError(e, vm, `${hook} hook`);
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

    class Dep {

        constructor() {
            this.subs = [];
        }
        depend() {
            if (Dep.target) {
                this.target.addDep(this);
            }
        }


        notify() {
            let watcher;
            for (watcher of this.subs) {
                watcher.update();
            }
        }
    }

    Dep.target = null;

    // 


    class Observer {
        

        constructor(value) {
            this.value = value;
            this.dep = new Dep();
            def(value, '__ob__', this);

            this.walk(value);
        }

        walk(obj) {
            const keys = Object.keys(obj);

            for (let k of keys) {
                defineReactive(obj, k);
            }
        }
    }



    function defineReactive(obj, key, val, customSetter) {
        const dep = new Dep;

        const property = Object.getOwnPropertyDescriptor(obj, key);

        if (property && property.configurable === false) {
            return;
        }

        const getter = property && property.get;
        const setter = property && property.set;

        if ((!getter || setter) && arguments.length === 2) {
            val = obj[key];
        }

        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                const value = getter ? getter.call(obj) : val;
                if (Dep.target) {
                    dep.depend();
                }

                return value;
            },
            set: function (newVal) {
                const value = getter ? getter.call(obj) : val;
                if (value === newVal) {
                    return;
                }

                if (customSetter) {
                    customSetter();
                }

                if (setter) {
                    setter.call(obj);
                } else {
                    val = newVal;
                }

                dep.notify();
            }
        });
    }


    function observe(value) {
        let ob;
        ob = new Observer(value);
        return ob;
    }

    //  

    function initRender(vm){
        vm._vnode = null; //子树的根
        vm._staticTrees = null;

        const options = vm.$options;
        const parentVnode = vm.$vnode = options._parentVnode;
        const renderContext = parentVnode && parentVnode.context;
        // createElement();
        vm._c = createElement();


        defineReactive(vm, '$attr', emptyObject ,function (){
            warn('$attr是只读属性');
        });
        // vm.
    }

    //

    // 

    function initState(vm) {
        vm._watchers = [];
        const options = vm.$options;

        if (options.props) initProps(vm, options.props);
        if (options.methods) initMethods(vm, options.methods);
        if (options.data) {
            initData(vm);
        } else {
            observe(vm._data = {});
        }

        // placeholder  computed

        if (options.watch) {
            initWatch(vm, options.watch);
        }
    }

    function initProps(vm, propsOptions) {
        const propsData = vm.$options.propsData || {};

        const props = vm._props = {};

        const keys = vm.$options._propKeys = [];

        for (let key in propsOptions) {
            keys.push(key);

            var value = propsOptions[key];

            defineReactive(props, key, value, function () {
                console.log('observe props');
            });
        }

    }

    function initMethods(vm, methods) {
        const props = vm.$options.props;
        for (let key of Object.keys(methods)) {
            {
                if (methods[key] == null) {
                    warn(`Method ${key}方法未定义`);
                }
                if (props && hasOwn(props, key)) {
                    warn('方法名已被props占用');
                }
                if ((key in vm) && isReserved(key)) {
                    warn('不要使用$或_开头的变量定义方法');
                }
            }
            vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
        }
    }

    function initData(vm) {
        const data = vm.$options.data;

        observe(data);
    }


    function initWatch(vm, watch) {
        for (const key of Object.keys(watch)) {
            const handler = watch[key];
            createWatcher(vm, key, handler);
        }
    }

    function createWatcher(vm, expOrFn, handler) {
        return vm.$watch(expOrFn, handler);
    }

    // placeholder Watcher

    const inBrowser = typeof window !== 'undefined';

    let mark;
    let measure;

    {
        const perf = inBrowser && window.performance;


        if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
            mark = tag => perf.mark(tag);

            measure = (name, startTag, endTag) => {
                perf.measure(name, startTag, endTag);
                console.log(perf.getEntries());

                // placeholder 哪里用到了？
                perf.clearMarks(startTag);
                perf.clearMarks(endTag);
                perf.clearMeasures(name);

            };
        }
    }

    // 

    let uid = 0;

    function initMixin(Vue) {
        Vue.prototype._init = function (options) {
            const vm = this;

            let startTag, endTag;

            vm._uid = uid++;

            if (mark) {
                startTag = `Vue perf start:${startTag}`;
                endTag = `Vue perf start:${endTag}`;
                mark(startTag);
            }

            vm._isVue = true;

            vm.$options = mergeOptions({}, options || {});

            // console.log(vm.$options);
            vm._self = vm;

            initLifecycle(vm);
            initEvents(vm);
            initRender(vm);
            callHook(vm, 'beforeCreate');
            initState(vm);
            callHook(vm, 'created');

            if (mark) {
                mark(endTag);
                measure(`Vue ${vm.$options.name} init`, startTag, endTag);
            }

            vm.$mount(this.$options.el);
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

    // 


    function query(el) {
        if (typeof el === 'string') {
            const selected = document.querySelector(el);
            if (!selected) {
                warn(`未找到元素：${el}`);
                return document.createElement('div');
            }
            return selected;
        } else {
            return el;
        }

    }

    // 

    Vue.prototype.$mount = function (el,
        hydrating) {
        el = (el && inBrowser) ? query(el): undefined;
        
        // return mountComponent(this, el, hydrating);
    };

    // 

    function compileToFuntions(){

        return {
            ast: null,
            render: 1234,
            staticRenderFns: null
        };
    }

    //

    // 

    const mount = Vue.prototype.$mount;

    Vue.prototype.$mount = function (el, hydrating) {
        // console.log('cccccccccc');
        const options = this.$options;
        el = el && query(el);

        // console.log(options);
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
            }
        }

        return mount.call(this, el, hydrating);
    };

    function getOuterHTML(el) {
        return el && el.outerHTML;
    }

    return Vue;

})));
