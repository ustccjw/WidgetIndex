/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/


/*
 * path:    src/ad/base/dom.js
 * desc:
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/07/23 15:07:08$
 */

goog.require('ad.event');
goog.require('ad.string');
goog.require('ad.browser');

goog.provide('ad.dom');
goog.provide('ad.DomHelper');

/**
 * @constructor
 * @param {Document=} opt_doc 指定document
 */
ad.DomHelper = function(opt_doc) {
    /**
     * @type {Document}
     */
    this.doc = opt_doc || document;
};

/**
 * @return {Document}
 */
ad.DomHelper.prototype.getDocument = function() {
    return this.doc;
};

/**
 * 从文档中获取指定的DOM元素
 * @param {string|Element} id 元素的id或DOM元素
 * @return {Element|null} 获取的元素，查找不到时返回null,如果参数不合法，直接返回参数
 */
ad.DomHelper.prototype.g = function(id) {
    if (Object.prototype.toString.call(id) === '[object String]') {
        return this.doc.getElementById(/** @type {string} */(id));
    }
    else if (id
        && id.nodeName
        && (id.nodeType === 1 || id.nodeType === 9)
    ) {
        return /** @type {Element|null} */(id);
    }
    return null;
};

/**
 * 以前只是webkit类的不支持 mouseenter 和 mouseleave，不过现在看情况都已经支持了，所以
 * 没必要用tangram里面的兼容性方案了，直接调用即可。
 *
 * @see http://www.quirksmode.org/dom/events/mouseover.html
 * @see http://trac.webkit.org/changeset/149173
 * @see https://code.google.com/p/chromium/issues/detail?id=236215
 * @see https://bugzilla.mozilla.org/show_bug.cgi?id=432698
 *
 * 为目标元素添加事件监听器
 * @param {string|Node|Window} element 目标元素或目标元素id
 * @param {string} type 事件类型
 * @param {Function} listener 需要添加的监听器
 * @return {Node|Window} 目标元素
 */
ad.DomHelper.prototype.on = function(element, type, listener) {
    if (typeof element === 'string') {
        element = this.doc.getElementById(element);
    }

    if (element.addEventListener) {
        element.addEventListener(type, listener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent('on' + type, function(event) {
            listener.call(element, event);
        });
    }

    return element;
};

/**
 * 如果浏览器不支持onmouseenter，需要自己处理onmouseover多次被触发的问题.
 * @param {string|Node|Window} element 目标元素或目标元素id
 * @param {Function} listener 需要添加的监听器
 * @return {Node|Window} 目标元素
 */
ad.DomHelper.prototype.enter = function(element, listener) {
    var type = ('onmouseenter' in this.doc.body) ? 'mouseenter' : 'mouseover';
    return this.on(element, type, listener);
};

/**
 * 如果浏览器不支持onmouseleave，需要自己处理onmouseout多次被触发的问题.
 * @param {string|Node|Window} element 目标元素或目标元素id
 * @param {Function} listener 需要添加的监听器
 * @return {Node|Window} 目标元素
 */
ad.DomHelper.prototype.leave = function(element, listener) {
    var type = ('onmouseleave' in this.doc.body) ? 'mouseleave' : 'mouseout';
    return this.on(element, type, listener);
};

/**
 * 为目标元素添加hover事件监听器
 * @param {string|Node|Window} element 目标元素或目标元素id
 * @param {Function} overCallback over的响应函数
 * @param {Function} outCallback  out的响应函数
 */
ad.DomHelper.prototype.hover = function hover(element, overCallback, outCallback) {// 实现hover事件
    // 判断是否悬浮在上方
    var isHover = false;
    // 上次悬浮时间
    var preOvTime = new Date().getTime();
    function over(opt_evt) {
        var evt = opt_evt || window.event;
        var curOvTime = new Date().getTime();
        // 处于over状态
        isHover = true;
        // 时间间隔超过10毫秒，认为鼠标完成了mouseout事件
        if (curOvTime - preOvTime > 10) {
            overCallback(evt, element);
        }
        preOvTime = curOvTime;
    }

    function out(opt_evt) {
        var evt = opt_evt || window.event;
        var curOvTime = new Date().getTime();
        preOvTime = curOvTime;
        isHover = false;
        setTimeout(function() {
            if (!isHover) {
                outCallback(evt, element);
            }
        }, 10);
    }

    this.on(element, 'mouseover', over);
    this.on(element, 'mouseout', out);
};

/**
 * 创建一个节点，插入到页面的最前面.
 * @param {string} tagName 节点的名称.
 * @return {Node}
 */
ad.DomHelper.prototype.prepend = function(tagName) {
    return this.doc.body.insertBefore(this.doc.createElement(tagName),
        this.doc.body.firstChild);
};

/**
 * @type {?HTMLScriptElement}
 */
ad.DomHelper.prototype._currentlyAddingScript = null;

/**
 * @type {?HTMLScriptElement}
 */
ad.DomHelper.prototype._interactiveScript = null;

/**
 * @param {HTMLScriptElement} script 要插入的节点.
 */
ad.DomHelper.prototype.appendScript = function(script) {
    this._currentlyAddingScript = script;

    var parent = (this.doc.head || this.doc.getElementsByTagName('head')[0] || this.doc.body);
    parent.insertBefore(script, parent.firstChild);

    this._currentlyAddingScript = null;
};

/**
 * @param {Node} element 要查找的元素.
 * @param {Node=} opt_canvas 跟节点.
 * @return {string}
 */
ad.DomHelper.prototype.getXPath = function(element, opt_canvas) {
    if (!element) {
        return '';
    }

    if (element === opt_canvas || baidu.dom.hasAttr(element, 'data-rendered')) {
        return 'id("' + element.id + '")';
    }

    if (element === this.doc.body) {
        return element.tagName;
    }

    var ix = 0;
    var siblings = element.parentNode.childNodes;
    for (var i = 0, l = siblings.length; i < l; i++) {
        var sibling = siblings[i];
        if (sibling === element) {
            return this.getXPath(element.parentNode, opt_canvas) + '/' + element.tagName + '[' + (ix + 1) + ']';
        }
        if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
            ix++;
        }
    }

    return '';
};

/**
 * 获取当前执行的脚本
 * @return {?HTMLScriptElement}
 */
ad.DomHelper.prototype.getCurrentScript = function() {
    if (this._currentlyAddingScript) {
        return this._currentlyAddingScript;
    }
    else if (this._interactiveScript &&
             this._interactiveScript.readyState === 'interactive') {
        return this._interactiveScript;
    }
    else {
        var scripts = this.doc.getElementsByTagName('script');
        var size = scripts.length;
        while (size--) {
            var script = scripts[size];
            if (script.readyState === 'interactive') {
                this._interactiveScript = script;
                return script;
            }
        }
        return null;
    }
};

/**
 * 添加精算的代码.
 * @param {string} id 精算的Id.
 * @param {Node} refNode 物料的Root节点.
 */
ad.DomHelper.prototype.createHMJSMoniter = function(id, refNode) {
    var hmjs;
    if (this.g('_bdhm_mkt_' + id)) {
        hmjs = this.g('_bdhm_mkt_' + id);
    }
    else {
        hmjs = this.doc.createElement('DIV');
        hmjs.id = '_bdhm_mkt_' + id;
        baidu.dom.insertAfter(hmjs, refNode);
    }
    var mkt = this.doc.createElement('script');
    mkt.src = ('https:' === this.doc.location.protocol ? 'https:' : 'http:') +
        '//click.hm.baidu.com/mkt.js?' + id;
    baidu.dom.insertAfter(mkt, hmjs);
};

/**
 * 动态的创建样式
 * @param {string} styles CSS代码的内容.
 * @param {?string} id Style节点的Id.
 * @param {Node} refNode Style节点需要插入到这个节点前面.
 * @param {Document|Element=} opt_context 所处context
 */
ad.DomHelper.prototype.createStyles = function(styles, id, refNode, opt_context) {
    var doc = opt_context || this.doc;
    var refParent = refNode.parentNode;
    if (!refParent) {
        return;
    }
    var style = doc.createElement('style');
    style.type = 'text/css';
    style.media = 'screen';
    if (id) {
        style.id =  id;
    }
    // XXX: 一定要先append到dom，然后再设置style的内容，否则IE8下会将hack丢掉
    // see: http://www.phpied.com/the-star-hack-in-ie8-and-dynamic-stylesheets/#comment-72253
    refParent.insertBefore(style, refNode);
    if (style.styleSheet) {
        style.styleSheet.cssText = styles;
    }
    else {
        style.appendChild(doc.createTextNode(styles));
    }
};

/**
 * 删除元素
 * 不同于tangram的remove方法的地方是：如果元素不存在，不会报错
 *
 * @param {string|Element} id .
 */
ad.DomHelper.prototype.remove = function(id) {
    var element = this.g(id);

    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
};

/**
 * 获取元素想对于文档的坐标和高宽
 *
 *      {
 *          top: 100,
 *          left: 100,
 *          width: 600,
 *          height: 400
 *      }
 *
 * @param {Element} element
 * @return {Object}
 */
ad.DomHelper.prototype.getRect = function(element) {
    element = this.g(element);

    var result = baidu.dom.getPosition(element);
    result['width'] = element.offsetWidth;
    result['height'] = element.offsetHeight;

    return result;
};

/**
 * 设置或获取opacity，兼容IE678
 *
 * @param {Element} element
 * @param {number=} opt_value
 * @return {string}
 */
ad.DomHelper.prototype.opacity = function(element, opt_value) {
    element = this.g(element);
    var useFilter = baidu.browser.ie && (baidu.browser.ie < 9);

    if (opt_value != null || opt_value === 0) {
        // 设置opacity
        if (useFilter) {
            var style = element.style;
            // 只能Quirks Mode下面生效??
            style.filter = ''
                + (style.filter || '').replace(/alpha\([^\)]*\)/gi, '')
                + (opt_value === 1 ? '' : 'alpha(opacity=' + opt_value * 100 + ')');
            // IE filters only apply to elements with 'layout.'
            style.zoom = 1;
        }
        else {
            element.style.opacity = opt_value;
        }

        return '';
    }
    else {
        // 获取opacity
        if (useFilter) {
            var filter = element.style.filter;
            return filter && filter.indexOf('opacity=') >= 0
                ? (parseFloat(filter.match(/opacity=([^)]*)/)[1]) / 100) + ''
                : '1';
        }
        else {
            return this.getStyle(element, 'opacity');
        }
    }
};

/**
 * 当匿名iframe准备完全后，执行回调函数。
 * 回调函数的参数为iframe的window、document，和表明是否需要修改document.domain的布尔值
 * 解决了IE下页面修改过document.domain后无法访问匿名iframe的问题
 * @param {Element} iframe
 * @param {function(Window, Document, boolean)} callback .
 */
ad.DomHelper.prototype.readyIframe = function(iframe, callback) {
    try {
        var win = iframe.contentWindow;
        var doc = win.document;
        callback(win, doc, false);
    }
    catch (e) {
        // 如果当前页面修改过document.domain
        // 那么会报“拒绝访问”的错误
        // 只有IE会进入到此处
        var onload = function() {
            var win = iframe.contentWindow;
            var doc = win.document;
            callback(win, doc, true);
            ad.event.un(iframe, 'onload', onload);
        };
        ad.event.on(iframe, 'onload', onload);
        /* jshint ignore:start */
        iframe.src = 'javascript:void((function() {' +
            'document.open("text/html", "replace");' +
            'document.domain = "' +
             this.doc.domain + '";' +
            'document.close();' +
            '})())';
        /* jshint ignore:end */
    }
};

/**
 * 把html写入匿名iframe中
 *
 * @param {Element} iframe .
 * @param {string} html .
 * @param {function(Window, Document)=} opt_onload .
 */
ad.DomHelper.prototype.writeIntoIframe = function(iframe, html, opt_onload) {
    var me = this;
    this.readyIframe(iframe, function(win, doc, updateDomain) {
        // 避免污染历史纪录堆栈
        doc.open('text/html', 'replace');
        if (updateDomain) {
            html = ''
                + html
                + '<script>document.domain = "' + me.doc.domain + '";</script>';
        }

        if (baidu.ie && baidu.ie < 10) {
            var extraScript = ''
                + '<script>'
                + 'var timer = setInterval('
                +     'function() {'
                          // 检测所有script及link是否已经加载运行完毕
                +         'var arr = document.getElementsByTagName(\'script\');'
                +         'var links = document.getElementsByTagName(\'link\');'
                +         'var allLoaded = true;'
                +         'for (var i = 0; i < links.length; i++) {'
                +             'if (!/loaded|complete/.test(links[i].readyState)) {'
                +                 'allLoaded = false;'
                +             '}'
                +         '}'
                +         'for(var i = 0; i < arr.length; i++) {'
                +             'if (!/loaded|complete/.test(arr[i].readyState)) {'
                +                 'allLoaded = false;'
                +             '}'
                +         '}'
                +         'if (allLoaded) {'
                +             'clearInterval(timer);'
                +             'document.close();'
                +         '}'
                +     '},'
                +     '200'
                + ');'
                + '</script>';
            doc.write(html + extraScript);
        }
        else {
            doc.write(html);
            doc.close();
        }

        if (!opt_onload) {
            return;
        }

        // 处理onload的回调函数
        var loaded = function() {
            if (bindEvent) {
                ad.event.un(iframe, 'loaded', loaded);
            }

            opt_onload(win, doc);
        };
        var bindEvent = false;
        if (doc.readyState === 'complete') {
            loaded();
        }
        else {
            bindEvent = true;
            ad.event.on(iframe, 'load', loaded);
        }
    });
};

/**
 * @type {Object} 已经测试过的css属性
 */
ad.DomHelper.prototype._testedCSS = {};

/**
 * 测试是否支持某个css属性名
 *
 * @param {string} cssName
 * @param {Element} element
 */
ad.DomHelper.prototype._testCssName = function(cssName, element) {
    return element.style[cssName] !== undefined;
};

/**
 * 测试是否支持某个css属性名及属性值
 *
 * @param {string} cssName
 * @param {Element} element
 * @param {string} cssValue
 */
ad.DomHelper.prototype._testCssValue = function(cssName, element, cssValue) {
    var old = element.style[cssName];
    if (old === undefined) {
        return false;
    }

    if (old === cssValue) {
        return true;
    }

    try {
        element.style[cssName] = cssValue;
    }
    catch (e) {}

    return element.style[cssName] !== old;
};

/**
 * 判断是否支持某个CSS属性
 *
 * @param {string} cssName css属性名
 * @param {string=} opt_cssValue css属性值
 * @param {Element=} opt_element 用于测试的元素
 */
ad.DomHelper.prototype.supportCSS = function(cssName, opt_cssValue, opt_element) {
    var testedCSS = this._testedCSS;
    var cssValue = opt_cssValue || '';
    var key = cssName + ':' + cssValue;
    var r = testedCSS[key];
    if (r != null) {
        return r;
    }

    var prefixs = ['Webkit', 'Moz', 'O', 'ms'];
    var element = opt_element || this.doc.createElement('div');
    cssName = ad.base.camelize(cssName);
    var capCssName = ad.base.capitalize(cssName);
    var cssNames = (cssName + ' ' + prefixs.join(capCssName + ' ') + capCssName).split(' ');
    var testedCssName;
    var testMethod = cssValue ? this._testCssValue : this._testCssName;
    for (var i = 0, l = cssNames.length; i < l; i++) {
        testedCssName = cssNames[i];
        if (testMethod(testedCssName, element, cssValue)) {
            r = testedCssName;
            break;
        }
    }

    return (testedCSS[key] = r || '');
};

/**
 * 判断一个元素是否包含另一个元素
 * @param {Element|string} container 包含元素或元素的id
 * @param {Element|string} contained 被包含元素或元素的id
 * @return {boolean} contained元素是否被包含于container元素的DOM节点上
 */
ad.DomHelper.prototype.contains = function(container, contained) {
    container = this.g(container);
    contained = this.g(contained);
    // TODO 无法处理文本节点的情况(IE)
    return container.contains
        ? container !== contained && container.contains(contained)
        : !!(container.compareDocumentPosition(contained) & 16);
};

/**
 * 判断元素是否拥有指定的className
 * 对于参数className，支持空格分隔的多个className
 * @param {Element|string} element 目标元素或目标元素的id
 * @param {string} className 要判断的className，可以是用空格拼接的多个className
 * @return {boolean} 是否拥有指定的classname
 *      如果要查询的classname有一个或多个不在元素的className中，返回false
 */
ad.DomHelper.prototype.hasClass = function(element, className) {
    element = this.g(element);
    var classArray = ad.string.trim(className).split(/\s+/);
    var len = classArray.length;

    className = element.className.split(/\s+/).join(' ');

    while (len--) {
        var pattern = new RegExp('(^| )' + classArray[len] + '( |$)');
        if (!pattern.test(className)) {
            return false;
        }
    }
    return true;
};

/**
 * 隐藏目标元素
 * @param {Element|string} element 目标元素或目标元素的id
 * @return {Element} 目标元素
 */
ad.DomHelper.prototype.hide = function(element) {
    var ele = this.g(element);
    ele.style.display = 'none';

    return ele;
};

/**
 * 为目标元素添加className
 * @param {Element|string} element 目标元素或目标元素的id
 * @param {string} className 要添加的className，允许同时添加多个class，中间使用空白符分隔
 * @return {Element} 目标元素
 */
ad.DomHelper.prototype.addClass = function (element, className) {
    element = this.g(element);
    var classArray = className.split(/\s+/);
    var result = element.className;
    var classMatch = ' ' + result + ' ';
    var i = 0;
    var l = classArray.length;

    for (; i < l; i++) {
        if (classMatch.indexOf(' ' + classArray[i] + ' ') < 0) {
            result += (result ? ' ' : '') + classArray[i];
        }
    }

    element.className = result;
    return element;
};

/**
 * 删除一个节点下面的所有子节点。
 * @param {Element|string} element 目标元素或目标元素的id
 * @return {Element} 目标元素
 */
ad.DomHelper.prototype.empty = function (element) {
    element = this.g(element);
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    // todo：删除元素上绑定的事件等?
    return element;
};

/**
 * 获取目标元素的computed style值。如果元素的样式值不能被浏览器计算，则会返回空字符串（IE）
 * @param {Element|string} element 目标元素或目标元素的id
 * @param {string} key 要获取的样式名
 * @return {string} 目标元素的computed style值
 */
ad.DomHelper.prototype.getComputedStyle = function(element, key) {
    element = this.g(element);
    var doc = element.ownerDocument;
    var styles;
    if (doc.defaultView && doc.defaultView.getComputedStyle) {
        styles = doc.defaultView.getComputedStyle(element, null);
        if (styles) {
            return styles[key] || styles.getPropertyValue(key);
        }
    }
    return '';
};

/**
 * 获取目标元素的样式值
 * @param {Element|string} element 目标元素或目标元素的id
 * @param {string} key 要获取的样式名
 *
 * 为了精简代码，本模块默认不对任何浏览器返回值进行归一化处理
 * （如使用getStyle时，不同浏览器下可能返回rgb颜色或hex颜色），
 * 也不会修复浏览器的bug和差异性（如设置IE的float属性叫styleFloat，firefox则是cssFloat）。
 * ad.DomHelper.styleFixer和ad.DomHelper.styleFilter可以为本模块提供支持。
 * 其中ad.DomHelper.styleFilter能对颜色和px进行归一化处理，
 * ad.DomHelper.styleFixer能对display，float，opacity，textOverflow的浏览器兼容性bug进行处理。
 *
 * TODO
 * 1. 无法解决px/em单位统一的问题（IE）
 * 2. 无法解决样式值为非数字值的情况（medium等 IE）
 * @return {string} 目标元素的样式值
 */
ad.DomHelper.prototype.getStyle = function (element, key) {
    element = this.g(element);
    key = baidu.string.toCamelCase(key);
    var value = (element.currentStyle ? element.currentStyle[key] : '')
                || this.getComputedStyle(element, key);

    // 在取不到值的时候，用fixer进行修正
    if (!value || value === 'auto') {
        var fixer = ad.DomHelper.styleFixer[key];
        if (fixer) {
            value = fixer.get ? fixer.get(element, key, value) : this.getStyle(element, fixer);
        }
    }

    /* 检查结果过滤器 */
    if (ad.DomHelper.styleFilter) {
        value = ad.DomHelper.filterStyle(key, value, 'get');
    }

    return value;
};

/**
 * 处理getStyle和setStyle的兼容性问题
 * @type {Object}
 */
ad.DomHelper.styleFixer = ad.DomHelper.styleFixer || {};
// 处理ie<8和firefox<3下的display值inline-block的设置
ad.DomHelper.styleFixer['display'] = ad.browser.ie && ad.browser.ie < 8
    ? {
        /**
         * 设置inline-block样式
         * @param {Element} element
         * @param {string} value
         */
        set: function (element, value) {
            var style = element.style;
            if (value === 'inline-block') {
                style.display = 'inline';
                style.zoom = 1;
            }
            else {
                style.display = value;
            }
        }
    }
    : baidu.browser.firefox && baidu.browser.firefox < 3
        ? {
            /**
             * 设置inline-block样式
             * @param {Element} element
             * @param {string} value
             */
            set: function (element, value) {
                element.style.display = value === 'inline-block' ? '-moz-inline-box' : value;
            }
        }
        : null;
// 处理ie下float的获取与设置
ad.DomHelper.styleFixer['float'] = baidu.browser.ie ? 'styleFloat' : 'cssFloat';
// 处理ie下opacity的获取与设置
ad.DomHelper.styleFixer['opacity'] = baidu.browser.ie ? {
    /**
     * 获取opacity样式
     * @param {Element} element
     * @return {string} value
     */
    get: function (element) {
        var filter = element.style.filter;
        return filter && filter.indexOf('opacity=') >= 0
            ? (parseFloat(filter.match(/opacity=([^)]*)/)[1]) / 100) + '' : '1';
    },
    /**
     * 设置opacity样式
     * @param {Element} element
     * @param {string} value
     */
    set: function (element, value) {
        var style = element.style;
        // 只能Quirks Mode下面生效??
        style.filter = (style.filter || '').replace(/alpha\([^\)]*\)/gi, '')
            + (value == 1 ? '' : 'alpha(opacity=' + value * 100 + ')'); // jshint ignore:line
        // IE filters only apply to elements with 'layout.'
        style.zoom = 1;
    }
} : null;

/**
 * 对getStyle和setStyle函数的输入输出进行归一化处理
 * @type {Array}
 */
ad.DomHelper.styleFilter = ad.DomHelper.styleFilter || [];
/**
 * 调用所有的filter进行归一化处理
 * @param {string} key
 * @param {string} value
 * @param {string} method
 * @return {string} value
 */
ad.DomHelper.filterStyle = function (key, value, method) {
    var i = 0;
    var filters = ad.DomHelper.styleFilter;
    var filter;
    for (; filter = filters[i]; i++) {
        filter = filter[method];
        if (filter) {
            value = filter(key, value);
        }
    }

    return value;
};
ad.DomHelper.styleFilter[ad.DomHelper.styleFilter.length] = {
    /**
     * 对获取得到的颜色值进行归一化处理
     * rgb(255, 255, 255) => #FFFFFF
     * @param {string} key
     * @param {string} value
     * @return {string} new value
     */
    get: function (key, value) {
        if (/color/i.test(key) && value.indexOf('rgb(') !== -1) {
            var array = value.split(',');

            value = '#';
            for (var i = 0, color; color = array[i]; i++) {
                color = parseInt(color.replace(/[^\d]/gi, ''), 10).toString(16);
                value += color.length === 1 ? '0' + color : color;
            }

            value = value.toUpperCase();
        }

        return value;
    }
};
ad.DomHelper.styleFilter[ad.DomHelper.styleFilter.length] = {
    /**
     * 对没有px的数字返回值，增加单位'px'
     *
     * @param {string} key
     * @param {string} value
     * @return {string} new value
     */
    set: function (key, value) {
        if (value.constructor === Number
            && !/zIndex|fontWeight|opacity|zoom|lineHeight/i.test(key)) {
            value = value + 'px';
        }

        return value;
    }
};

// 默认以当前 document 生成的实例
ad.dom = new ad.DomHelper();



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
