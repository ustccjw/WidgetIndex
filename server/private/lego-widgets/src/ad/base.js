/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/

/*global document:false, navigator:true, COMPILED:false, location:true */

/**
 * src/ad/base.js ~ 2013/07/03 14:29:30
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$
 * @description
 *
 **/
goog.provide('ad.base');

if (typeof RT_CONFIG === 'object' && !RT_CONFIG['HOST']) {
    // 保证调试或者不兼容的时候不会出错
    // 素材库升级之后，生成的物料中会添加 RT_CONFIG.HOST 的另外一个实现
    // RT_CONFIG.HOST = function(host){
    //     return RT_CONFIG.HOSTMAP[host] || 'http://' + host;
    // };
    // RT_CONFIG.HOSTMAP = {
    //     'ecma.bdimg.com': '%%BEGIN_HOST%%http://ecma.bdimg.com%%END_HOST%%',
    //     ...
    //     ...
    // };
    RT_CONFIG['HOST'] = function(host) {
        return 'http://' + host;
    };
}

/**
 * @return {string}
 */
ad.base.uuid = function() {
    var uuid = Math.floor(Math.random() * 2147483648).toString(36);
    if (COMPILED) {
        return uuid;
    }
    else {
        if (navigator.userAgent.indexOf('PhantomJS') !== -1) {
            return (ad.base.uuid._counter ++).toString(36);
        }
        else {
            return uuid;
        }
    }
};

/**
 * @type {number}
 */
ad.base.uuid._counter = 8964;

/**
 * @param {string} name The fully qualified name.
 * @param {Object=} opt_obj The object within which to look;
 *                          default is |window|.
 * @param {string=} opt_delimiter 分隔符，默认是'.'
 * @return {?(Object|string|boolean|number)} The object or, if not found, null.
 */
ad.base.getObjectByName = function(name, opt_obj, opt_delimiter) {
    var delimiter = opt_delimiter || '.';
    var parts = name.split(delimiter);
    var cur = opt_obj || window;
    for (var part; part = parts.shift(); ) {
        if (cur[part] != null) {
            cur = cur[part];
        }
        else {
            return null;
        }
    }
    return cur;
};

/**
 * @param {string} name name of the object that this file defines.
 * @param {*=} opt_object the object to expose at the end of the path.
 */
ad.base.exportPath = function(name, opt_object) {
    var parts = name.split('.');
    var cur = window;

    /* jshint ignore:start */
    if (!(parts[0] in cur) && cur.execScript) {
        cur.execScript('var ' + parts[0]);
    }
    /* jshint ignore:end */

    // Parentheses added to eliminate strict JS warning in Firefox.
    for (var part; parts.length && (part = parts.shift());) {
        if (!parts.length && opt_object !== undefined) {
            // last part and we have an object; use it
            cur[part] = opt_object;
        }
        else if (cur[part]) {
            cur = cur[part];
        }
        else {
            cur = cur[part] = {};
        }
    }
};

/**
 * 遍历一个多维的数组.
 * @param {Array.<*>} items 需要遍历的数组.
 * @param {Function} callback 针对数组中的每个元素调用一次callback.
 */
ad.base.forEach = function(items, callback) {
    function walker(part, idxArr) {
        if (baidu.lang.isArray(part)) {
            baidu.each(part, function(item, index) {
                walker(item, idxArr.concat([index]));
            });
        }
        else {
            callback(part, idxArr);
        }
    }
    walker(items, []);
};

/**
 * @param {string} data 要执行的代码.
 */
ad.base.globalEval = function(data) {
    // We use execScript on Internet Explorer
    // We use an anonymous function so that context is window
    // rather than jQuery in Firefox
    /* jshint ignore:start */
    (window.execScript || function(data) {
        window['eval'].call(window, data);
    })(data);
    /* jshint ignore:end */
};

/**
 * @param {Function} callback 回调
 */
ad.base.ready = function(callback) {
    var bdsReady = ad.base.getObjectByName('bds.ready');
    if (typeof bdsReady === 'function') {
        bdsReady(function() {
            callback();
        });
    }
};

/**
 * @param {Function} callback 回调
 */
ad.base.jqueryReady = function(callback) {
    var bdsReady = ad.base.getObjectByName('bds.ready');
    if (typeof bdsReady === 'function') {
        bdsReady(function() {
            callback();
        });
    }
    else if (ad.base.getObjectByName('jQuery.fn.jquery') !== null){//其他子频道可能包含jQuery
        callback();
    }
    else {
        var jqUrl = RT_CONFIG['HOST']('s1.bdstatic.com') + '/r/www/cache/static/jquery/jquery-1.10.2.min_f2fb5194.js';
        baidu.sio.callByBrowser(jqUrl, function(){
            callback();
        });
    }
};

/**
 * 检测 esl 是否存在
 * @return {boolean}
 */
ad.base.isEslExist = function() {
    if (typeof require === 'function'
        && typeof require.config === 'function'
        && typeof require.toUrl === 'function'
    ) {
        var host = RT_CONFIG['HOST']('ecma.bdimg.com');
        require.config({
            'packages': [{
                'name': 'ecma',
                'location': host + '/public01'
            }]
        });
        if (require.toUrl('ecma/a/b/c') === (host + '/public01/a/b/c')) {
            return true;
        }
    }
    return false;
};

/**
 * 调用esl 异步require js文件
 * @param {string} id 资源module id
 * @param {string} url 加载js文件地址.
 * @param {Function} callback 回调.
 * @param {boolean} opt_rename 如果页面里已有其他 amd 加载器，但不是esl的情况下，是否加载修改了函数名称的 esl
 */
ad.base.require = function(id, url, callback, opt_rename) {
    var useRenamedEsl = false;
    if (!url || !id) {
        return;
    }

    function load() {
        var parts = url.split('?');
        var conf = {
            'paths': {}
        };
        conf['paths'][id] = parts[0].replace(/\.js$/, '');
        if (parts.length >= 2) {
            conf['urlArgs'] = {};
            conf['urlArgs'][id] = parts.slice(1).join('?');
        }
        if (!useRenamedEsl) {
            require.config(conf);
            require([id], function(data){
                callback(data);
            });
        }
        else {
            ESL_require.config(conf);
            /* jshint ignore:start */
            ESL_require([id], function(data){
                callback(data);
            });
            /* jshint ignore:end */
        }
    }

    if (typeof require === 'function') { // 有require，但是不一定是 esl
        if (ad.base.isEslExist()) { // 确定是 esl
            load();
        }
        else {
            // 确定不是 esl 的情况下有两种选择：(1)使用已有的 require 算了；(2)使用修改函数名称(ESL_define/ESL_require)的 esl
            var rename = opt_rename === true;
            if (!rename) {
                load();
            }
            else {
                useRenamedEsl = true;
                ad.base.loadRenamedEsl(load);
            }
        }
    }
    else {
        // 避免在大搜页下偶尔出现require被覆盖的情况
        var bdsReady = ad.base.getObjectByName('bds.ready');
        if (typeof bdsReady === 'function') {
            bdsReady(function() {
                load();
            });
        } else {
            ad.base.loadEsl(load);
        }
    }
};

/**
 * 加载esl
 * @param {Function} callback 在esl加载完成之后执行的回调.
 */
ad.base.loadEsl = function(callback) {
    if (ad.base.isEslExist()) {
        callback();
        return;
    }
    var waitingList = ad.base.getObjectByName('ECOM_ESL_REQUIRE.waitingList') || [];
    waitingList.push(callback);
    ad.base.exportPath('ECOM_ESL_REQUIRE.waitingList', waitingList);
    if (ad.base.getObjectByName('ECOM_ESL_REQUIRE.isLoading')) {
        return;
    }
    ad.base.exportPath('ECOM_ESL_REQUIRE.isLoading', true);
    baidu.sio.callByBrowser(
        RT_CONFIG['HOST']('s1.bdstatic.com') + '/r/www/cache/ecom/esl/1-8-2/esl.js',
        function() {
            var list = ad.base.getObjectByName('ECOM_ESL_REQUIRE.waitingList') || [];
            for (var i = 0; i < list.length; i++) {
                list[i].call(null);
            }
            ad.base.exportPath('ECOM_ESL_REQUIRE.waitingList', []);
        }
    );
};

/**
 * 加载修改过的esl
 * @param {Function} callback 在esl加载完成之后执行的回调.
 */
ad.base.loadRenamedEsl = function(callback) {
    if (typeof ESL_require === 'function') {
        callback();
        return;
    }
    var waitingList = ad.base.getObjectByName('ECOM_RENAMED_ESL_REQUIRE.waitingList') || [];
    waitingList.push(callback);
    ad.base.exportPath('ECOM_RENAMED_ESL_REQUIRE.waitingList', waitingList);
    if (ad.base.getObjectByName('ECOM_RENAMED_ESL_REQUIRE.isLoading')) {
        return;
    }
    ad.base.exportPath('ECOM_RENAMED_ESL_REQUIRE.isLoading', true);
    baidu.sio.callByBrowser(
        RT_CONFIG['HOST']('ecma.bdimg.com') + '/lego-mat/esl_renamed.js',
        function() {
            var list = ad.base.getObjectByName('ECOM_RENAMED_ESL_REQUIRE.waitingList') || [];
            for (var i = 0; i < list.length; i++) {
                list[i].call(null);
            }
            ad.base.exportPath('ECOM_RENAMED_ESL_REQUIRE.waitingList', []);
        }
    );
};

/**
 * 使用window.name的方式发post跨域请求
 *
 * @param {string} url .
 * @param {Object} data
 *                  {
 *                      'name': 'zhouminming01',
 *                      'boxIds': [2, 4, 5, 6]
 *                  }.
 * @param {Function} callback .
 * @param {Object=} opt_option
 *                  {
 *                      'proxy': 'blank.html'   // relative to '/'
 *                      'encoding': 'utf-8'
 *                  }.
 */
ad.base.postByWindowName = function (url, data, callback, opt_option) {
    // option
    var option = opt_option || {};
    option['proxy'] = option['proxy'] || 'blank.html';
    option['encoding'] = option['encoding'] || 'UTF-8';
    if (option['proxy'].indexOf('http') !== 0) {
        option['proxy'] =
            location.protocol + '//' + location.host + '/' + option['proxy'];
    }

    // create form
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    // create form
    var formHtml = '';
    var escapeString = baidu.string.filterFormat.escapeString;
    /**
     * create input and append to form
     *
     * @param {string} key .
     * @param {boolean|string|number} value .
     */
    function appendInput (key, value) {
        if (value == null) {
            return;
        }

        formHtml += ''
            + '<input type="text" '
            + 'name="' + escapeString(key) + '" '
            + 'value="' + escapeString(value.toString()) + '"/>';
    }
    for (var key in data) {
        var value = data[key];
        if (baidu.lang.isArray(value)) {
            key += '[]';
            for (var i = 0, l = value.length; i < l; i++) {
                appendInput(key, value[i]);
            }
        }
        else {
            appendInput(key, value);
        }
    }

    formHtml = ''
        + '<!DOCTYPE html>'
        + '<html lang="en">'
        + '<head>'
        +     '<meta charset="' + option['encoding'] + '">'
        +     '<title></title>'
        + '</head>'
        + '<body>'
        +     '<form '
        +         'action="' + url + '" '
        +         'method="POST" '
        +         'enctype="application/x-www-form-urlencoded">'
        +         formHtml
        +     '</form>'
        + '</body>'
        + '</html>';

    var iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(formHtml);
    iframeDoc.close();
    var form = iframeDoc.getElementsByTagName('form')[0];

    // bind on load
    var flag = false;
    var onload = function() {
        if (flag) {
            var win = iframe.contentWindow;
            var data;
            try {
                // 避免因为url访问不到而报错
                data = win.name;
            } catch(e) {
                data = '';
            }
            callback(data);

            // unbind onload event
            baidu.un(iframe, 'onload');

            // clear and remove dom
            try {
                // 避免proxy页面访问不到而在IE下报错
                iframeDoc.write('');
                win.close();
                iframe.parentNode.removeChild(iframe);
            } catch(e) {}
        }
        else {
            flag = true;
            iframe.contentWindow.location = option['proxy'];
        }
    };

    // must use attachEvent on IE
    // or onload event won't fire twice.
    baidu.on(iframe, 'onload', onload);

    // submit
    form.submit();
};

var class2type = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regexp',
    '[object Object]': 'object',
    '[object Error]': 'error'
};
var toString = Object.prototype.toString;

/**
 * 获取变量类型
 *
 * @param {Object} obj .
 * @return {string} type .
 */
ad.base.type = function (obj) {
    if (obj == null) {
        return String(obj);
    }

    // Support: Safari <= 5.1 (functionish RegExp)
    return typeof obj === 'object' || typeof obj === 'function' ?
            class2type[toString.call(obj)] || 'object' :
            typeof obj;
};

/**
 * 扩展对象，与baidu.extend不同的是，此方法是深度拷贝。
 *
 *      var a = {}, b = {c: {d: 'd'}};
 *      baidu.extend(a, b);
 *      b.c.d = 'dd';
 *      console.log(a.c.d === 'dd'); // true
 *      a = {}, b = {c: {d: 'd'}};
 *      ad.base.extend(a, b);
 *      b.c.d = 'dd';
 *      console.log(a.c.d === 'd'); // true
 *
 * @param {Object} target 被扩展对象.
 * @param {Object} src 扩展源.
 * @param {boolean=} opt_rewrite 如果键值冲突，是否覆盖
 */
ad.base.extend = function (target, src, opt_rewrite) {
    for (var key in src) {
        if (src.hasOwnProperty(key) &&
           (opt_rewrite || !target.hasOwnProperty(key))) {
            // NOTE: Element and window
            var srcType = ad.base.type(src[key]);
            if (srcType === 'object' || srcType === 'array') {
                var targetType = ad.base.type(target[key]);
                if (targetType !== 'object' && targetType !== 'array') {
                    target[key] = srcType === 'object' ? {} : [];
                }
                ad.base.extend(target[key], src[key], opt_rewrite);
            } else {
                target[key] = src[key];
            }
        }
    }
};


/**
 * 截字
 * 如果你需要截取的文字中包含飘红的标签（span/font/em/strong）则使用此方法
 * 否则用baidu.string.subByte
 *
 * @param {string} source 源字符串.
 * @param {number} length 截取的长度.
 * @param {string=} opt_tail 附加的文字，例如"...".
 */
ad.base.subByte = function (source, length, opt_tail) {
    var tagReg = /<\/?(?:span|font|em|strong)[^>]*>/g;
    var tagList = {};
    var text = source.replace(tagReg, function (match, pos) {
        tagList[pos] = match;
        return '';
    });

    if (length >= baidu.string.getByteLength(text)) {
        // 不需要截字
        return source;
    }

    text = baidu.string.subByte(text, length);
    var result = [];
    var index = 0;
    var tagLength = 0;
    var tag;
    for (var pos in tagList) {
        pos = parseInt(pos, 10);
        tag = tagList[pos];
        pos -= tagLength;
        tagLength += tag.length;
        result.push(text.slice(index, pos));
        // tag始终保存，避免出现只保留起始标签的情况
        result.push(tag);
        index = pos;
    }
    result.push(text.slice(index));
    result.push(opt_tail || '');

    return result.join('');
};

/**
 * 删除链接的target
 * @param {string} code 要重写的代码
 * @return {string} 去除target之后的代码
 */
ad.base.removeLinkTarget = function(code) {
    return (code || '').replace(/(<a(?=\s)[^>]*)\starget=['"][^'"]*['"]([^>]*>)/g, '$1$2');
};

/**
 * 获得flash对象的实例, chrome32开始document[movieName]返回数组了
 * @param {string} name flash对象的名称
 * @returns {HTMLElement} flash对象的实例
 */
ad.base.getMovie = function(name) {
    var movie = document[name];
    if (movie) {
        if (movie.length) {
            var swfElms = [];
            for (var i = 0, len = movie.length; i < len; i++) {
                if (movie[i].tagName.toLowerCase() === 'embed') {
                    swfElms.push(movie[i]);
                }
            }
            movie = swfElms.length === 1 ? swfElms[0] : swfElms;
        }
    }
    else if (!movie) {
        movie = window[name];
    }
    return movie;
};

/**
 * 用于记录定时器ID
 * @type {Object.<number, boolean>}
 */
ad.base._setTimeoutMap = {};

/**
 * 用于记录定时器ID
 * @type {Object.<number, boolean>}
 */
ad.base._setIntervalMap = {};

/**
 * 替代原生setTimeout，记录timer，用于最终clear
 * @param {Function} fn 回调函数
 * @param {number} timeout 延迟时间
 */
ad.base.setTimeout = function(fn, timeout) {
    ad.base._registerTimerUnHandler();

    var id = setTimeout(fn, timeout);
    ad.base._setTimeoutMap[id] = true;

    return id;
};

/**
 * 替代原生clearTimeout
 * @param {number} id 定时器ID
 */
ad.base.clearTimeout = function(id) {
    if (!id) {
        return;
    }
    delete ad.base._setTimeoutMap[id];
    clearTimeout(id);
};

/**
 * 替代原生setInterval，记录timer，用于最终clear
 * @param {Function} fn 回调函数
 * @param {number} interval 间隔时间
 */
ad.base.setInterval = function(fn, interval) {
    ad.base._registerTimerUnHandler();

    var id = setInterval(fn, interval);
    ad.base._setIntervalMap[id] = true;

    return id;
};

/**
 * 替代原生clearInterval
 * @param {number} id 定时器ID
 */
ad.base.clearInterval = function(id) {
    if (!id) {
        return;
    }
    delete ad.base._setIntervalMap[id];
    clearInterval(id);
};

/**
 * 绑定UnloadHanlder的标志
 * @type {boolean}
 */
ad.base._isTimerUnHandlerBound = false;

/**
 * 绑定timer的dispose处理函数
 */
ad.base._registerTimerUnHandler = function() {
    if (!ad.base._isTimerUnHandlerBound) {
        ad.base.registerUnloadHandler(function() {
            for (var id in ad.base._setTimeoutMap) {
                if (ad.base._setTimeoutMap.hasOwnProperty(id)) {
                    ad.base.clearTimeout(parseInt(id, 10));
                }
            }
            for (var id in ad.base._setIntervalMap) {
                if (ad.base._setIntervalMap.hasOwnProperty(id)) {
                    ad.base.clearInterval(parseInt(id, 10));
                }
            }
        });
        ad.base._isTimerUnHandlerBound = true;
    }
};

/**
 * PS-IS项目中，异步模式下翻页的时候，会调用所有相关的handler，把资源释放掉
 * 需要释放的资源主要有：
 * 1. 给window，document，document.body绑定过的事件
 * 2. 一些定时器setInterval，setTimeout之类的
 * 3. 其它
 * 另外还会有build/task的任务来检查是否正常的释放了所有需要释放的资源（TODO）
 *
 * @param {Function} handler 回调函数
 */
ad.base.registerUnloadHandler = function(handler) {
    var register = ad.base.getObjectByName('bds.comm.registerUnloadHandler');
    if (typeof register === 'function') {
        register(handler);
    }
};

/**
 * 给有dom延迟加载的widget添加处理函数
 * @param {Function} callback 处理函数
 */
ad.base.fixDeferLinks = function(callback) {
    if (COMPILED && navigator.userAgent.toLowerCase().indexOf('phantomjs') !== -1) {
        window['ECOM_LEGO_WIDGETS_STATS_CALLBACKS'] = window['ECOM_LEGO_WIDGETS_STATS_CALLBACKS'] || [];
        window['ECOM_LEGO_WIDGETS_STATS_CALLBACKS'].push(callback);
    }
};

/**
 * 首字母大写
 *
 * @param {string} str capitalize
 * @return {string} Capitalize
 */
ad.base.capitalize = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * 驼峰化
 *
 * @param {string} str box-sizing
 * @return {string} boxSizing
 */
ad.base.camelize = function (str) {
    return str.replace(/\-([a-z])/g, function (r, $1) {
        return $1.toUpperCase();
    });
};
















/* vim: set ts=4 sw=4 sts=4 tw=100: */
