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

        list.map((val) => map[val] = true);

        return toLowerCase ? (key) => map[key.toLowerCase()] : (key) => map[key];
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


    function isUndef(v) {
        return v === undefined || v === null;
    }

    function isDef(v) {
        return v !== undefined && v !== null;
    }

    function toString(val) {
        return val === null ? '' : (typeof val === 'object') ? JSON.stringify(val, null, 2) : String(val);
    }

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

    class Dep {

        constructor() {
            this.subs = [];
        }
        depend() {
            if (Dep.target) {
               this.subs.push(Dep.target); 
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
    const targetStack = [];

    function pushTarget(target) {
        if (Dep.target) targetStack.push(Dep.target);
        Dep.target = target;
    }

    function popTarget(){
        Dep.target = targetStack.pop();
    }

    // 

    class Watcher {
        
        
        
        constructor(vm, expOrFn, cb) {
            this.vm = vm;
            vm._watchers.push(this);

            if (typeof expOrFn === 'function') {
                this.getter = expOrFn;
            } else {
                this.getter = expOrFn;
            }

            this.value = this.get();
        }

        get(){
            pushTarget(this);
            const vm = this.vm;
            let value;
            try{
                value = this.getter();
            }catch(e){
                console.log(e);
            }finally{
                popTarget();
            }
            return value;
        }

        update(){
            // debugger;
            this.getter();
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

    function lifecycleMixin(Vue) {
        Vue.prototype._update = function (vnode) {
            const vm = this;
            const prevVnode = vm._vnode;
            vm._vnode = vnode;

            // 
            if (!prevVnode) {
                vm.$el = vm.__patch__(vm.$el, vnode);
            }else{
                vm.$el = vm.__patch__(prevVnode, vnode);
            }
        };
    }

    function callHook(vm, hook) {
        const handlers = vm.$options[hook];
        if (handlers) {
            let h;
            for (h of handlers.values()) {
                try {
                    h.call(vm);
                } catch (e) {
                    // console.log(e);
                    logError(e, vm, `${hook} hook`);
                }
            }
        }
        // debugger;
    }

    function mountComponent(vm, el) {
        callHook(vm, 'beforeMount');
        // console.log(vm._render.toString());
        vm.$el = el;
        function updateComponent() {
            const vnode = vm._render();
            console.log(vnode);
            vm._update(vnode);
        }

        new Watcher(vm, updateComponent);
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

    function isReservedTag(str){
        // return true;

        return isHtmlTag(str) || isSVG(str);
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

    const isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
    'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
    'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view');

    // 
    class Vnode {
        
        
        
        
        constructor(tag, children, elm, text) {
            this.tag = tag;
            this.children = children;
            this.elm = elm;
            this.text = text;
        }
    }

    function createTextNode(val) {
        return new Vnode(undefined, undefined, undefined, String(val));
    }

    function createEmptyNode() {
        return new Vnode(undefined, undefined, undefined, '');
    }

    // 

    function createElement(context, tag, children) {
        return _createElement(undefined, tag, children);
    }

    function _createElement(context, tag, children) {


        let vnode;

        if (typeof tag === 'string') {
            if (isReservedTag(tag)) {
                vnode = new Vnode(tag, children);
            }
        }
        return vnode ? vnode : createEmptyNode();
    }

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
        const dep = new Dep();

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
                // debugger;
                return value;
            },
            set: function (newVal) {
                console.log(newVal);
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

    function renderList(){
        
    }

    // 

    function installRenderHelpers(target) {
        target._l = renderList;
        target._v = createTextNode;
        target._s = toString;
    }

    //  

    function initRender(vm) {
        vm._vnode = null; //子树的根
        vm._staticTrees = null;

        const options = vm.$options;
        const parentVnode = vm.$vnode = options._parentVnode;
        const renderContext = parentVnode && parentVnode.context;
        // createElement();
        vm._c = (tag, children) => createElement(vm, tag, children);


        defineReactive(vm, '$attr', emptyObject, function () {
            warn('$attr是只读属性');
        });
        // vm.
    }


    function renderMixin(vm) {
        installRenderHelpers(vm.prototype);

        vm.prototype._render = function () {
            let vm = this;
            let vnode;
            const { render } = vm.$options;

            try {
                vnode = render.call(this);
            } catch (e) {
                warn(e);
            }

            return vnode;
        };
    }

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
        vm._data = data;
        let keys = Object.keys(data);

        for (let i of keys) {

            // Object.defineProperty(vm, i, data[i]);
            proxy(vm, '_data', i);
        }

        observe(data);
    }

    function proxy(target, sourceKey, key) {
        let sharedPropertyDefinition = {
            enumrable: true,
            configurable: true,
            get: noop,
            set: noop
        };

        sharedPropertyDefinition.get = function () {
            // debugger;
            // console.log('ggggggg');
            return this[sourceKey][key];
        };
        sharedPropertyDefinition.set = function (val) {
            this[sourceKey][key] = val;
        };

        Object.defineProperty(target, key, sharedPropertyDefinition);
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
    }

    initMixin(Vue);
    lifecycleMixin(Vue);
    renderMixin(Vue);

    const domTools = {
        createElement(tagName) {
            const elm = document.createElement(tagName);
            if (tagName != 'select') {
                return elm;
            }
        },
        insertBefore(parentNode, newNode, referenceNode) {
            parentNode.insertBefore(newNode, referenceNode);
        },
        appendChild(node, child) {
            node.appendChild(child);
        },
        parentNode(node){
            return node.parentNode;
        },
        removeChild(parent, child){
            parent.removeChild(child);
        },
        createTextNode(text){
            const elm = document.createTextNode(text);
            return elm;
        },
        setTextContent(node, text){
            //textContent 不会触发重排，厉害
            node.textContent = text;
        },
        nextSibling(node){
            return node.nextSibling();
        }
    };

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

    function createRealElement(vnode, parentElm, refElm) {
        if (!vnode) {
            return;
        }
        const children = vnode.children;

        const tag = vnode.tag;
        if (isDef(tag)) {
            vnode.elm = domTools.createElement(tag);
        } else if (vnode.expression && vnode.type === 2) {
            vnode.elm = domTools.createTextNode(vnode.expression);
        } else if (vnode.text) {
            vnode.elm = domTools.createTextNode(vnode.text);
        }
        if (children) {
            createChildrenRealElement(vnode, children);
        }

        insert(parentElm, vnode.elm, refElm);
    }

    function createChildrenRealElement(vnode, children) {
        if (Array.isArray(children)) {
            for (let c of children) {
                createRealElement(c, vnode.elm);
            }
        }
    }

    function insert(parent, elm, refElm) {

        if (isDef(parent) && isDef(elm)) {
            domTools.insertBefore(parent, elm, refElm);
        }
    }


    function removeNode(el) {
        if (el.nodeType) {
            let parentElm = domTools.parentNode(el);
            domTools.removeChild(parentElm, el);
        }
    }

    function sameVnode(a, b) {
        return a.tag === b.tag;
    }

    function patchVnode(oldVnode, vnode) {
        if (oldVnode === vnode) {
            return;
        }

        const elm = vnode.elm = oldVnode.elm;

        const ch = vnode.children;
        const oldCh = oldVnode.children;
        if (isUndef(vnode.text)) {
            if (isDef(ch) && isDef(oldCh)) {
                updateChildren(elm, oldCh, ch);
            }
        } else {
            domTools.setTextContent(elm, vnode.text);
        }


    }

    function updateChildren(parentElm, oldCh, ch) {
        let oldStartIndex = 0;
        let oldEndIndex = oldCh.length - 1;
        let oldStartVnode = oldCh[0];
        let oldEndVnode = oldCh[oldEndIndex];

        let newStartIndex = 0;
        let newEndIndex = ch.length - 1;
        let newStartVnode = ch[0];
        let newEndVnode = ch[oldEndIndex];

        while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
            oldStartVnode = oldCh[oldStartIndex];
            oldEndVnode = oldCh[oldEndIndex];
            newStartVnode = ch[newStartIndex];
            newEndVnode = ch[newEndIndex];

            if (sameVnode(oldStartVnode, newStartVnode)) {
                patchVnode(oldStartVnode, newStartVnode);
                ++oldStartIndex;
                ++newStartIndex;
            } else if (sameVnode(oldEndVnode, newEndVnode)) {
                patchVnode(oldEndVnode, newEndVnode);
                --oldEndIndex;
                --newEndIndex;
            } else if (sameVnode(oldStartVnode, newEndVnode)) {
                patchVnode(oldStartVnode, newEndVnode);
                domTools.insertBefore(parentElm, oldStartVnode.elm, domTools.nextSibling(oldEndVnode.elm));
                ++oldStartIndex;
                --newEndIndex;
            } else if (sameVnode(oldEndVnode, newStartVnode)) {
                patchVnode(oldEndVnode, newStartVnode);
                domTools.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                ++oldStartIndex;
                --newEndIndex;
            } else {
                createRealElement(newStartVnode, parentElm, oldStartVnode.elm);
                ++oldStartIndex;
            }
        }

        if (oldStartIndex > oldEndIndex) {
            addVnodes(parentElm, oldStartVnode.elm, ch, newStartIndex, newEndIndex);
        } else if (newStartIndex > newEndIndex) {
            removeVnodes(oldCh, oldStartIndex, oldEndIndex);
        }
    }

    function addVnodes(parentElm, refElm, vnodes, startIndex, endIndex) {
        for (; startIndex <= endIndex; startIndex++) {
            createRealElement(vnodes[startIndex], parentElm, refElm);
        }
    }

    function removeVnodes(vnodes, startIndex, endIndex) {
        // if (vnode.elm) {
        for (; startIndex <= endIndex; startIndex++) {
            removeNode(vnodes[startIndex].elm);
        }
    }

    function createPatchFunction() {

        return function patch(oldVnode, vnode) {
            const isRealElement = x => isDef(x.nodeType);

            if (isUndef(oldVnode)) {
                console.log('没有根');
            } else {
                if (!isRealElement(oldVnode) && sameVnode(oldVnode, vnode)) {
                    patchVnode(oldVnode, vnode);
                } else {
                    if (isRealElement(oldVnode)) {
                        oldVnode = new Vnode(oldVnode.tagName, [], oldVnode);

                    }

                    let parentElm = domTools.parentNode(oldVnode.elm);
                    createRealElement(vnode, parentElm, oldVnode.elm);

                    if (isDef(parentElm)) {
                        removeVnodes([oldVnode], 0, 0);
                    }
                }
            }
        };
    }

    const patch = createPatchFunction();

    // 

    Vue.prototype.__patch__ = patch;

    Vue.prototype.$mount = function (el,
        hydrating) {
        el = (el && inBrowser) ? query(el) : undefined;

        // console.log(this);
        // console.log(this.$options.render.call(this));
        return mountComponent(this, el, hydrating);
    };

    // 

    const isPlainTextElement = makeMap('script,style,textarea', true);

    const attribute = /^.+?(?=\/?>)/;

    const ncname = '[a-zA-Z_][\\w\\-\\.]*';
    const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
    const startTagOpen = new RegExp(`^<${qnameCapture}`);
    const startTagClose = /^\s*(\/?)>/;
    const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);

    function parseHTML(html, options) {
        // return makeMap('script,style');
        let last;
        let index = 0;
        let stack = [];
        while (html) {
            last = html;
            if (!isPlainTextElement(last)) {
                let textEnd = html.indexOf('<');

                if (textEnd === 0) {
                    const startTagMatch = parseStartTag();
                    if (startTagMatch) {
                        handleStartTag(startTagMatch);
                    }

                    const endTagMatch = parserEndTag();

                    if (endTagMatch) {
                        let { tagName, start, end } = endTagMatch;

                        handleEndTag(tagName, start, end);
                    }
                }

                if (textEnd > 0) {
                    let text;
                    text = html.substring(0, textEnd);
                    advance(textEnd);

                    if(text && options.text){
                        options.text(text);
                    }
                }
            }
        }



        function advance(n) {
            index += n;
            html = html.substring(n);
        }

        function parseStartTag() {
            const start = html.match(startTagOpen);
            if (start) {
                const match = {
                    tagName: start[1],
                    start: index,
                    attrs: []
                };
                advance(start[0].length);
                let end, attr;

                while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                    advance(attr[0].length);
                }

                if (end) {
                    advance(end[0].length);
                    match.end = index;
                    return match;
                }
            }
        }

        function handleStartTag(match) {
            let tagName = match.tagName;
            stack.push({ tagName });

            if (options.start) {
                options.start(tagName);
            }

        }

        function parserEndTag() {
            const end = html.match(endTag);
            if (end) {
                let match = {
                    tagName: end[1],
                    start: index
                };
                advance(end[0].length);
                match.end = index;
                return match;
            }
        }

        function handleEndTag(tagName, start, end) {
            let pos;
            if (tagName) {
                for (pos = stack.length - 1; pos >= 0; pos--) {
                    if (stack[pos].tagName === tagName) {

                        break;
                    } else {
                        console.log(`${stack[pos].tagName}未闭合`);
                    }
                }
            } else {
                pos = 0;
            }

            stack.length = pos;
            // lastTag = pos && stack[pos - 1];

            if(options.end){
                options.end();
            }
        }
    }

    const defaultExpReg = /\{\{(.)+?\}\}/;

    function parseText(text){

        let match = text.match(defaultExpReg);
        let expression;
        if(match){
            expression = `_s(${match[1].trim()})`;
        }
        return {expression};
    }

    // 

    function createASTElement(tag, attrs, parent) {
        return {
            type: 1,
            tag,
            attrsList: attrs,
            parent,
            children: []
        };
    }

    function parse(template) {
        const stack = [];
        let currentParent = null;
        let root;

        parseHTML(template, {
            start(tag) {
                let element = createASTElement(tag);
                if (!root) {
                    root = element;
                }

                if (currentParent) {
                    currentParent.children.push(element);
                    element.parent = currentParent;
                }

                currentParent = element;
                stack.push(element);
            },

            text(text) {
                const children = currentParent.children;

                // 提取表达式
                let { expression } = parseText(text);

                if (expression) {
                    children.push({
                        type: 2,
                        text,
                        expression
                    });

                } else if (text != ' ') {
                    children.push({
                        type: 3,
                        text
                    });
                }
            },
            end() {
                const element = stack[stack.length - 1];
                stack.pop();
                currentParent = element.parent;
            }
        });
        return root;
    }

    // 
    function generate(ast){
        const code = ast ? genElement(ast) : '_c("div")';

        return {
            render: `with(this){return ${code}}`
        };
    }

    function genElement(el){

        let code;

        const children = genChildren(el);
        
        code = `_c('${el.tag}',${children})`;

        return code;
    }

    function genText(el){
        let text = '';
        if(el.type === 2){
            text =el.expression.trim();
        }else{
            text =el.text.trim(); 
        }

        let code = `_v(${text})`;
        return code;
    }

    function genChildren(el){

        const children = el.children;

        if(children && children.length){
            return `[${children.map(c => genNode(c)).join(',')}]`;
        }
    }

    function genNode(el){
        if(el.type === 1){
            return genElement(el);
        }else if(el.type === 2 || el.type === 3){
            return genText(el);
        }
    }

    // 

    function codeToFunction(code) {
        // try {
            return new Function(code);
        // } catch (e) {
        //     warn(e);
        //     return noop;
        // }
    }

    // 

    function baseCompile(template){
        const ast = parse(template.trim());
        const code = generate(ast);
        return {
            ast: ast,
            render: codeToFunction(code.render),
            staticRenderFns: null
        };
    }

    //

    // 

    const mount = Vue.prototype.$mount;

    Vue.prototype.$mount = function (el, hydrating) {
        const options = this.$options;
        el = el && query(el);

        if (el === document.body || el === document.documentElement) {
            warn('不要将Vue挂载到html或body上');
            return;
        }

        if (!options.render) {
            let template = options.template;
            if (template) {
                warn('没有模板');
            } else {
                template = getOuterHTML(el);
            }
            if (template) {
                const { render, staticRenderFns } = baseCompile(template, {}, this);
                console.log(render.toString());
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
