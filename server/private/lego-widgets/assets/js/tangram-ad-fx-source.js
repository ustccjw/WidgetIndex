// Copyright (c) 2009, Baidu Inc. All rights reserved.
// 
// Licensed under the BSD License
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http:// tangram.baidu.com/license.html
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
 /**
 * @namespace T Tangram七巧板
 * @name T
 * @version 1.5.2.2
*/

/**
 * 声明baidu包
 * @author: allstar, erik, meizz, berg
 */
var T,
    baidu = T = baidu || {version: "1.5.2.2"}; 

//提出guid，防止在与老版本Tangram混用时
//在下一行错误的修改window[undefined]
baidu.guid = "$BAIDU$";

//Tangram可能被放在闭包中
//一些页面级别唯一的属性，需要挂载在window[baidu.guid]上
baidu.$$ = window[baidu.guid] = window[baidu.guid] || {global:{}};

/**
 * 操作dom的方法
 * @namespace baidu.dom 
 */
baidu.dom = baidu.dom || {};


/**
 * 从文档中获取指定的DOM元素
 * @name baidu.dom.g
 * @function
 * @grammar baidu.dom.g(id)
 * @param {string|HTMLElement} id 元素的id或DOM元素.
 * @shortcut g,T.G
 * @meta standard
 * @see baidu.dom.q
 *
 * @return {HTMLElement|null} 获取的元素，查找不到时返回null,如果参数不合法，直接返回参数.
 */
baidu.dom.g = function(id) {
    if (!id) return null; //修改IE下baidu.dom.g(baidu.dom.g('dose_not_exist_id'))报错的bug，by Meizz, dengping
    if ('string' == typeof id || id instanceof String) {
        return document.getElementById(id);
    } else if (id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
        return id;
    }
    return null;
};

// 声明快捷方法
baidu.g = baidu.G = baidu.dom.g;

/**
 * 对语言层面的封装，包括类型判断、模块扩展、继承基类以及对象自定义事件的支持。
 * @namespace baidu.lang
 */
baidu.lang = baidu.lang || {};


/**
 * 返回一个当前页面的唯一标识字符串。
 * @name baidu.lang.guid
 * @function
 * @grammar baidu.lang.guid()
 * @version 1.1.1
 * @meta standard
 *             
 * @returns {String} 当前页面的唯一标识字符串
 */
baidu.lang.guid = function() {
    return "TANGRAM$" + baidu.$$._counter ++;
};

//不直接使用window，可以提高3倍左右性能
baidu.$$._counter = baidu.$$._counter || 1;


// 20111129	meizz	去除 _counter.toString(36) 这步运算，节约计算量

/**
 * Tangram继承机制提供的一个基类，用户可以通过继承baidu.lang.Class来获取它的属性及方法。
 * @class
 * @name 	baidu.lang.Class
 * @grammar baidu.lang.Class(guid)
 * @param 	{string}	guid	对象的唯一标识
 * @meta standard
 * @remark baidu.lang.Class和它的子类的实例均包含一个全局唯一的标识guid。guid是在构造函数中生成的，因此，继承自baidu.lang.Class的类应该直接或者间接调用它的构造函数。<br>baidu.lang.Class的构造函数中产生guid的方式可以保证guid的唯一性，及每个实例都有一个全局唯一的guid。
 * @meta standard
 * @see baidu.lang.inherits,baidu.lang.Event
 */
baidu.lang.Class = function() {
    this.guid = baidu.lang.guid();

    !this.__decontrolled && (baidu.$$._instances[this.guid] = this);
};

baidu.$$._instances = baidu.$$._instances || {};

/**
 * 释放对象所持有的资源，主要是自定义事件。
 * @name dispose
 * @grammar obj.dispose()
 * TODO: 将_listeners中绑定的事件剔除掉
 */
baidu.lang.Class.prototype.dispose = function(){
    delete baidu.$$._instances[this.guid];

    // this.__listeners && (for (var i in this.__listeners) delete this.__listeners[i]);

    for(var property in this){
        typeof this[property] != "function" && delete this[property];
    }
    this.disposed = true;   // 20100716
};

/**
 * 重载了默认的toString方法，使得返回信息更加准确一些。
 * 20111219 meizz 为支持老版本的className属性，以后统一改成 __type
 * @return {string} 对象的String表示形式
 */
baidu.lang.Class.prototype.toString = function(){
    return "[object " + (this.__type || this._className || "Object") + "]";
};

/**
 * 按唯一标识guid字符串取得实例对象
 *
 * @param   {String}    guid
 * @return  {object}            实例对象
 */
 window["baiduInstance"] = function(guid) {
     return baidu.$$._instances[guid];
 }

//  2011.11.23  meizz   添加 baiduInstance 这个全局方法，可以快速地通过guid得到实例对象
//  2011.11.22  meizz   废除创建类时指定guid的模式，guid只作为只读属性
//  2011.11.22  meizz   废除 baidu.lang._instances 模块，由统一的global机制完成；


/**
 * 判断目标参数是否string类型或String对象
 * @name baidu.lang.isString
 * @function
 * @grammar baidu.lang.isString(source)
 * @param {Any} source 目标参数
 * @shortcut isString
 * @meta standard
 * @see baidu.lang.isObject,baidu.lang.isNumber,baidu.lang.isArray,baidu.lang.isElement,baidu.lang.isBoolean,baidu.lang.isDate
 *             
 * @returns {boolean} 类型判断结果
 */
baidu.lang.isString = function (source) {
    return '[object String]' == Object.prototype.toString.call(source);
};

// 声明快捷方法
baidu.isString = baidu.lang.isString;


/**
 * 自定义的事件对象。
 * @class
 * @name 	baidu.lang.Event
 * @grammar baidu.lang.Event(type[, target])
 * @param 	{string} type	 事件类型名称。为了方便区分事件和一个普通的方法，事件类型名称必须以"on"(小写)开头。
 * @param 	{Object} [target]触发事件的对象
 * @meta standard
 * @remark 引入该模块，会自动为Class引入3个事件扩展方法：addEventListener、removeEventListener和dispatchEvent。
 * @meta standard
 * @see baidu.lang.Class
 */
baidu.lang.Event = function (type, target) {
    this.type = type;
    this.returnValue = true;
    this.target = target || null;
    this.currentTarget = null;
};
 
/**
 * 派发自定义事件，使得绑定到自定义事件上面的函数都会被执行。引入baidu.lang.Event后，Class的子类实例才会获得该方法。
 * @grammar obj.dispatchEvent(event, options)
 * @param {baidu.lang.Event|String} event 	Event对象，或事件名称(1.1.1起支持)
 * @param {Object} 					options 扩展参数,所含属性键值会扩展到Event对象上(1.2起支持)
 * @remark 处理会调用通过addEventListenr绑定的自定义事件回调函数之外，还会调用直接绑定到对象上面的自定义事件。例如：<br>
myobj.onMyEvent = function(){}<br>
myobj.addEventListener("onMyEvent", function(){});
 */
baidu.lang.Class.prototype.fire =
baidu.lang.Class.prototype.dispatchEvent = function (event, options) {
    baidu.lang.isString(event) && (event = new baidu.lang.Event(event));

    !this.__listeners && (this.__listeners = {});

    // 20100603 添加本方法的第二个参数，将 options extend到event中去传递
    options = options || {};
    for (var i in options) {
        event[i] = options[i];
    }

    var i, n, me = this, t = me.__listeners, p = event.type;
    event.target = event.target || (event.currentTarget = me);

    // 支持非 on 开头的事件名
    p.indexOf("on") && (p = "on" + p);

    typeof me[p] == "function" && me[p].apply(me, arguments);

    if (typeof t[p] == "object") {
        for (i=0, n=t[p].length; i<n; i++) {
            t[p][i] && t[p][i].apply(me, arguments);
        }
    }
    return event.returnValue;
};

/**
 * 注册对象的事件监听器。引入baidu.lang.Event后，Class的子类实例才会获得该方法。
 * @grammar obj.addEventListener(type, handler[, key])
 * @param   {string}   type         自定义事件的名称
 * @param   {Function} handler      自定义事件被触发时应该调用的回调函数
 * @return  {Function}              将用户注入的监听函数返回，以便移除事件监听，特别适用于匿名函数。
 * @remark  事件类型区分大小写。如果自定义事件名称不是以小写"on"开头，该方法会给它加上"on"再进行判断，即"click"和"onclick"会被认为是同一种事件。 
 */
baidu.lang.Class.prototype.on =
baidu.lang.Class.prototype.addEventListener = function (type, handler, key) {
    if (typeof handler != "function") {
        return;
    }

    !this.__listeners && (this.__listeners = {});

    var i, t = this.__listeners;

    type.indexOf("on") && (type = "on" + type);

    typeof t[type] != "object" && (t[type] = []);

    // 避免函数重复注册
    for (i = t[type].length - 1; i >= 0; i--) {
        if (t[type][i] === handler) return handler;
    };

    t[type].push(handler);

    // [TODO delete 2013] 2011.12.19 兼容老版本，2013删除此行
    key && typeof key == "string" && (t[type][key] = handler);

    return handler;
};

//  2011.12.19  meizz   很悲剧，第三个参数 key 还需要支持一段时间，以兼容老版本脚本
//  2011.11.24  meizz   事件添加监听方法 addEventListener 移除第三个参数 key，添加返回值 handler
//  2011.11.23  meizz   事件handler的存储对象由json改成array，以保证注册函数的执行顺序
//  2011.11.22  meizz   将 removeEventListener 方法分拆到 baidu.lang.Class.removeEventListener 中，以节约主程序代码
/**
 * 提供各种公共的动画功能
 * @namespace baidu.fx
 */
baidu.fx = baidu.fx || {} ;



/**
 * 为类型构造器建立继承关系
 * @name baidu.lang.inherits
 * @function
 * @grammar baidu.lang.inherits(subClass, superClass[, type])
 * @param {Function} subClass 子类构造器
 * @param {Function} superClass 父类构造器
 * @param {string} type 类名标识
 * @remark
 * 
使subClass继承superClass的prototype，因此subClass的实例能够使用superClass的prototype中定义的所有属性和方法。<br>
这个函数实际上是建立了subClass和superClass的原型链集成，并对subClass进行了constructor修正。<br>
<strong>注意：如果要继承构造函数，需要在subClass里面call一下，具体见下面的demo例子</strong>
	
 * @shortcut inherits
 * @meta standard
 * @see baidu.lang.Class
 */
baidu.lang.inherits = function (subClass, superClass, type) {
    var key, proto, 
        selfProps = subClass.prototype, 
        clazz = new Function();
        
    clazz.prototype = superClass.prototype;
    proto = subClass.prototype = new clazz();

    for (key in selfProps) {
        proto[key] = selfProps[key];
    }
    subClass.prototype.constructor = subClass;
    subClass.superClass = superClass.prototype;

    // 类名标识，兼容Class的toString，基本没用
    typeof type == "string" && (proto.__type = type);

    subClass.extend = function(json) {
        for (var i in json) proto[i] = json[i];
        return subClass;
    }
    
    return subClass;
};

// 声明快捷方法
baidu.inherits = baidu.lang.inherits;

//  2011.11.22  meizz   为类添加了一个静态方法extend()，方便代码书写
/**
 * 操作原生对象的方法
 * @namespace baidu.object
 */
baidu.object = baidu.object || {};


/**
 * 将源对象的所有属性拷贝到目标对象中
 * @author erik
 * @name baidu.object.extend
 * @function
 * @grammar baidu.object.extend(target, source)
 * @param {Object} target 目标对象
 * @param {Object} source 源对象
 * @see baidu.array.merge
 * @remark
 * 
1.目标对象中，与源对象key相同的成员将会被覆盖。<br>
2.源对象的prototype成员不会拷贝。
		
 * @shortcut extend
 * @meta standard
 *             
 * @returns {Object} 目标对象
 */
baidu.extend =
baidu.object.extend = function (target, source) {
    for (var p in source) {
        if (source.hasOwnProperty(p)) {
            target[p] = source[p];
        }
    }
    
    return target;
};


/**
 * 提供一个按时间进程的时间线类
 *
 * 本类提供两个方法：
 *  cancel()    取消操作
 *  end()       直接结束
 *
 * 使用本类时需要实现五个接口：
 *  initialize()            用于类初始化时的操作
 *  transition(percent)    重新计算时间线进度曲线
 *  finish()                用于类结束时时的操作
 *  render(schedule)        每个脉冲在DOM上的效果展现
 *  restore()               效果被取消时作的恢复操作
 *
 * @config {Number} interval 脉冲间隔时间（毫秒）
 * @config {Number} duration 时间线总时长（毫秒）
 * @config {Number} percent  时间线进度的百分比
 */
 
 
 
/**
 * 提供一个按时间进程的时间线类
 * @class
 * @grammar new baidu.fx.Timeline(options)
 * @param {Object} options 参数
 * @config {Number} interval 脉冲间隔时间（毫秒）
 * @config {Number} duration 时间线总时长（毫秒）
 * @config {Number} percent  时间线进度的百分比
 */
baidu.fx.Timeline = function(options){
    baidu.lang.Class.call(this);

    this.interval = 16;
    this.duration = 500;
    this.dynamic  = true;

    baidu.object.extend(this, options);
};
baidu.lang.inherits(baidu.fx.Timeline, baidu.lang.Class, "baidu.fx.Timeline").extend({
/**
 *  @lends baidu.fx.Timeline.prototype
 */
    /**
     * 启动时间线
     * @return {instance} 类实例
     */
    launch : function(){
        var me = this;
        me.dispatchEvent("onbeforestart");

        /**
        * initialize()接口，当时间线初始化同步进行的操作
        */
        typeof me.initialize =="function" && me.initialize();

        me["\x06btime"] = new Date().getTime();
        me["\x06etime"] = me["\x06btime"] + (me.dynamic ? me.duration : 0);
        me["\x06pulsed"]();

        return me;
    }

    /**
     * 每个时间脉冲所执行的程序
     * @ignore
     * @private
     */
    ,"\x06pulsed" : function(){
        var me = this;
        var now = new Date().getTime();
        // 当前时间线的进度百分比
        me.percent = (now - me["\x06btime"]) / me.duration;
        me.dispatchEvent("onbeforeupdate");

        // 时间线已经走到终点
        if (now >= me["\x06etime"]){
            typeof me.render == "function" && me.render(me.transition(me.percent = 1));

            // [interface run] finish()接口，时间线结束时对应的操作
            typeof me.finish == "function" && me.finish();

            me.dispatchEvent("onafterfinish");
            me.dispose();
            return;
        }

        /**
        * [interface run] render() 用来实现每个脉冲所要实现的效果
        * @param {Number} schedule 时间线的进度
        */
        typeof me.render == "function" && me.render(me.transition(me.percent));
        me.dispatchEvent("onafterupdate");

        me["\x06timer"] = setTimeout(function(){me["\x06pulsed"]()}, me.interval);
    }
    /**
     * 重新计算 schedule，以产生各种适合需求的进度曲线
     * @function
     * @param {Function} percent 
     */
    ,transition: function(percent) {
        return percent;
    }

    /**
     * 撤销当前时间线的操作，并引发 restore() 接口函数的操作
     * @function
     */
    ,cancel : function() {
        this["\x06timer"] && clearTimeout(this["\x06timer"]);
        this["\x06etime"] = this["\x06btime"];

        // [interface run] restore() 当时间线被撤销时的恢复操作
        typeof this.restore == "function" && this.restore();
        this.dispatchEvent("oncancel");

        this.dispose();
    }

    /**
     * 直接将时间线运行到结束点
     */
    ,end : function() {
        this["\x06timer"] && clearTimeout(this["\x06timer"]);
        this["\x06etime"] = this["\x06btime"];
        this["\x06pulsed"]();
    }
});

/**
 * 效果基类。
 * @function
 * @grammar baidu.fx.collapse(element, options, fxName)
 * @param     {HTMLElement}           element            添加效果的DOM元素
 * @param     {JSON}                  options            时间线的配置参数对象
 * @config    {Function}              transition         function(schedule){return schedule;},时间线函数
 * @config    {Function}              onbeforestart      function(){},//效果开始前执行的回调函数
 * @config    {Function}              onbeforeupdate     function(){},//每次刷新画面之前会调用的回调函数
 * @config    {Function}              onafterupdate      function(){},//每次刷新画面之后会调用的回调函数
 * @config    {Function}              onafterfinish      function(){},//效果结束后会执行的回调函数
 * @config    {Function}              oncancel           function(){},//效果被撤销时的回调函数
 * @param     {String}                fxName             效果名（可选）
 * @return {baidu.fx.Timeline}  时间线类的一个实例
 */
baidu.fx.create = function(element, options, fxName) {
    var timeline = new baidu.fx.Timeline(options);

    timeline.element = element;
    timeline.__type = fxName || timeline.__type;
    timeline["\x06original"] = {};   // 20100708
    var catt = "baidu_current_effect";

    /**
     * 将实例的guid记录到DOM元素上，以便多个效果叠加时的处理
     */
    timeline.addEventListener("onbeforestart", function(){
        var me = this, guid;
        me.attribName = "att_"+ me.__type.replace(/\W/g, "_");
        guid = me.element.getAttribute(catt);
        me.element.setAttribute(catt, (guid||"") +"|"+ me.guid +"|", 0);

        if (!me.overlapping) {
            (guid = me.element.getAttribute(me.attribName)) 
                && window[baidu.guid]._instances[guid].cancel();

            //在DOM元素上记录当前效果的guid
            me.element.setAttribute(me.attribName, me.guid, 0);
        }
    });

    /**
     * 打扫dom元素上的痕迹，删除元素自定义属性
     */
    timeline["\x06clean"] = function(e) {
    	var me = this, guid;
        if (e = me.element) {
            e.removeAttribute(me.attribName);
            guid = e.getAttribute(catt);
            guid = guid.replace("|"+ me.guid +"|", "");
            if (!guid) e.removeAttribute(catt);
            else e.setAttribute(catt, guid, 0);
        }
    };

    /**
     * 在时间线结束时净化对DOM元素的污染
     */
    timeline.addEventListener("oncancel", function() {
        this["\x06clean"]();
        this["\x06restore"]();
    });

    /**
     * 在时间线结束时净化对DOM元素的污染
     */
    timeline.addEventListener("onafterfinish", function() {
        this["\x06clean"]();
        this.restoreAfterFinish && this["\x06restore"]();
    });

    /**
     * 保存原始的CSS属性值 20100708
     */
    timeline.protect = function(key) {
        this["\x06original"][key] = this.element.style[key];
    };

    /**
     * 时间线结束，恢复那些被改过的CSS属性值
     */
    timeline["\x06restore"] = function() {
        var o = this["\x06original"],
            s = this.element.style,
            v;
        for (var i in o) {
            v = o[i];
            if (typeof v == "undefined") continue;

            s[i] = v;    // 还原初始值

            // [TODO] 假如以下语句将来达不到要求时可以使用 cssText 操作
            if (!v && s.removeAttribute) s.removeAttribute(i);    // IE
            else if (!v && s.removeProperty) s.removeProperty(i); // !IE
        }
    };

    return timeline;
};


/**
 * fx 的所有 【属性、方法、接口、事件】 列表
 *
 * property【七个属性】                 默认值 
 *  element             {HTMLElement}           效果作用的DOM元素
 *  interval            {Number}        16      脉冲间隔时间（毫秒）
 *  duration            {Number}        500     时间线总时长（毫秒）
 *  percent             {Number}                时间线进度的百分比
 *  dynamic             {Boolean}       true    是否渐进式动画还是直接显示结果
 *  overlapping         {Boolean}       false   效果是否允许互相叠加
 *  restoreAfterFinish  {Boolean}       false   效果结束后是否打扫战场
 *
 * method【三个方法】
 *  end()       直接结束
 *  cancel()    取消操作
 *  protect()   保存元素原始的CSS属性值，以便自动 restore 操作
 *
 * event【四个事件】
 *  onbeforestart()
 *  onbeforeupdate()
 *  onafterupdate()
 *  onafterfinish()
 *
 * interface【五个接口】
 *  initialize()            用于类初始化时的操作
 *  transition(percent)     重新计算时间线进度曲线
 *  finish()                用于类结束时时的操作
 *  restore()               效果结束后的恢复操作
 *  render(schedule)        每个脉冲在DOM上的效果展现
 */


/**
 * 从文档中获取指定的DOM元素
 * **内部方法**
 * 
 * @param {string|HTMLElement} id 元素的id或DOM元素
 * @meta standard
 * @return {HTMLElement} DOM元素，如果不存在，返回null，如果参数不合法，直接返回参数
 */
baidu.dom._g = function (id) {
    if (baidu.lang.isString(id)) {
        return document.getElementById(id);
    }
    return id;
};

// 声明快捷方法
baidu._g = baidu.dom._g;

/**
 * 获取目标元素所属的document对象
 * @name baidu.dom.getDocument
 * @function
 * @grammar baidu.dom.getDocument(element)
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @meta standard
 * @see baidu.dom.getWindow
 *             
 * @returns {HTMLDocument} 目标元素所属的document对象
 */
baidu.dom.getDocument = function (element) {
    element = baidu.dom.g(element);
    return element.nodeType == 9 ? element : element.ownerDocument || element.document;
};


/**
 * 获取目标元素的computed style值。如果元素的样式值不能被浏览器计算，则会返回空字符串（IE）
 *
 * @author berg
 * @name baidu.dom.getComputedStyle
 * @function
 * @grammar baidu.dom.getComputedStyle(element, key)
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {string} key 要获取的样式名
 *
 * @see baidu.dom.getStyle
 *             
 * @returns {string} 目标元素的computed style值
 */

baidu.dom.getComputedStyle = function(element, key){
    element = baidu.dom._g(element);
    var doc = baidu.dom.getDocument(element),
        styles;
    if (doc.defaultView && doc.defaultView.getComputedStyle) {
        styles = doc.defaultView.getComputedStyle(element, null);
        if (styles) {
            return styles[key] || styles.getPropertyValue(key);
        }
    }
    return ''; 
};

// 20111204 meizz   去掉一个无用的import baidu.browser.ie
/**
 * 提供给setStyle与getStyle使用
 */
baidu.dom._styleFixer = baidu.dom._styleFixer || {};

/**
 * 提供给setStyle与getStyle使用
 */
baidu.dom._styleFilter = baidu.dom._styleFilter || [];



/**
 * 为获取和设置样式的过滤器
 * @private
 * @meta standard
 */
baidu.dom._styleFilter.filter = function (key, value, method) {
    for (var i = 0, filters = baidu.dom._styleFilter, filter; filter = filters[i]; i++) {
        if (filter = filter[method]) {
            value = filter(key, value);
        }
    }

    return value;
};

/**
 * 操作字符串的方法
 * @namespace baidu.string
 */
baidu.string = baidu.string || {};


/**
 * 将目标字符串进行驼峰化处理
 * @name baidu.string.toCamelCase
 * @function
 * @grammar baidu.string.toCamelCase(source)
 * @param {string} source 目标字符串
 * @remark
 * 支持单词以“-_”分隔
 * @meta standard
 *             
 * @returns {string} 驼峰化处理后的字符串
 */
 
 //todo:考虑以后去掉下划线支持？
baidu.string.toCamelCase = function (source) {
    //提前判断，提高getStyle等的效率 thanks xianwei
    if (source.indexOf('-') < 0 && source.indexOf('_') < 0) {
        return source;
    }
    return source.replace(/[-_][^-_]/g, function (match) {
        return match.charAt(1).toUpperCase();
    });
};


/**
 * 获取目标元素的样式值
 * @name baidu.dom.getStyle
 * @function
 * @grammar baidu.dom.getStyle(element, key)
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {string} key 要获取的样式名
 * @remark
 * 
 * 为了精简代码，本模块默认不对任何浏览器返回值进行归一化处理（如使用getStyle时，不同浏览器下可能返回rgb颜色或hex颜色），也不会修复浏览器的bug和差异性（如设置IE的float属性叫styleFloat，firefox则是cssFloat）。<br />
 * baidu.dom._styleFixer和baidu.dom._styleFilter可以为本模块提供支持。<br />
 * 其中_styleFilter能对颜色和px进行归一化处理，_styleFixer能对display，float，opacity，textOverflow的浏览器兼容性bug进行处理。	
 * @shortcut getStyle
 * @meta standard
 * @see baidu.dom.setStyle,baidu.dom.setStyles, baidu.dom.getComputedStyle
 *             
 * @returns {string} 目标元素的样式值
 */
// TODO
// 1. 无法解决px/em单位统一的问题（IE）
// 2. 无法解决样式值为非数字值的情况（medium等 IE）
baidu.dom.getStyle = function (element, key) {
    var dom = baidu.dom;

    element = dom.g(element);
    key = baidu.string.toCamelCase(key);
    //computed style, then cascaded style, then explicitly set style.
    var value = element.style[key] ||
                (element.currentStyle ? element.currentStyle[key] : "") || 
                dom.getComputedStyle(element, key);

    // 在取不到值的时候，用fixer进行修正
    if (!value || value == 'auto') {
        var fixer = dom._styleFixer[key];
        if(fixer){
            value = fixer.get ? fixer.get(element, key, value) : baidu.dom.getStyle(element, fixer);
        }
    }
    
    /* 检查结果过滤器 */
    if (fixer = dom._styleFilter) {
        value = fixer.filter(key, value, 'get');
    }

    return value;
};

// 声明快捷方法
baidu.getStyle = baidu.dom.getStyle;


 
/**
 * 移动元素，将参数元素移动到指定位置。注意：对static定位的DOM元素无效。
 * @function
 * @grammar baidu.fx.move(element, options)
 * @param       {string|HTMLElement}      element           元素或者元素的ID
 * @param       {Object}                  options           选项。参数的详细说明如下表所示
 * @config      {Number}                  x                 0,//横坐标移动的偏移量，默认值为0px。
 * @config      {Number}                  y                 0,//纵坐标移动的偏移量，默认值为0px。
 * @config      {Number}                  duration          500,//效果持续时间，默认值为500ms。
 * @config      {Number}                  interval          16, //动画帧间隔时间，默认值为16ms。
 * @config      {Function}                transition        function(schedule){return schedule;},时间线函数
 * @config      {Function}                onbeforestart     function(){},//效果开始前执行的回调函数
 * @config      {Function}                onbeforeupdate    function(){},//每次刷新画面之前会调用的回调函数
 * @config      {Function}                onafterupdate     function(){},//每次刷新画面之后会调用的回调函数
 * @config      {Function}                onafterfinish     function(){},//效果结束后会执行的回调函数
 * @config      {Function}                oncancel          function(){},//效果被撤销时的回调函数
 * @remark
 * 1.0.0开始支持
 */
baidu.fx.move = function(element, options) {
    if (!(element = baidu.dom.g(element))
        || baidu.dom.getStyle(element, "position") == "static") return null;
    
    options = baidu.object.extend({x:0, y:0}, options || {});
    if (options.x == 0 && options.y == 0) return null;

    var fx = baidu.fx.create(element, baidu.object.extend({
        //[Implement Interface] initialize
        initialize : function() {
            this.protect("top");
            this.protect("left");

            this.originX = parseInt(baidu.dom.getStyle(element, "left"))|| 0;
            this.originY = parseInt(baidu.dom.getStyle(element, "top")) || 0;
        }

        //[Implement Interface] transition
        ,transition : function(percent) {return 1 - Math.pow(1 - percent, 2);}

        //[Implement Interface] render
        ,render : function(schedule) {
            element.style.top  = (this.y * schedule + this.originY) +"px";
            element.style.left = (this.x * schedule + this.originX) +"px";
        }
    }, options), "baidu.fx.move");

    return fx.launch();
};
;T.undope=true;