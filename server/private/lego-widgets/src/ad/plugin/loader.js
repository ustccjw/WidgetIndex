/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * src/ad/plugin/loader.js ~ 2013/07/12 22:39:46
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$
 * @description
 * 通用的异步广告代码的loader
 * 根据我们的业务需求特征，loader需要保证对js的加载是串行的。
 * 调用load的时候，对于同样的js路径，如果原来的没有正常返回，那么就忽略之。
 * 只需要处理ontimeout的事件（setTimeout），无法处理onerror的事件。
 * 另外，如果想要abort某个请求的话，貌似还无法做到（需要测试）
 **/
goog.require('ad.dom');

goog.provide('ad.plugin.loader');

ad.plugin.loader = {
    /**
     * @type {Object.<string, (Function|Object)>}
     */
    _cache: {},

    /**
     * @type {Array.<Object>}
     */
    _wait4PreDefines: []
};

/**
 * @param {string|Array.<string>} moduleIds 需要加载的模块.
 * @param {Function} callback 加载完毕之后的回掉函数.
 */
ad.plugin.loader.require = function(moduleIds, callback) {
    if (typeof moduleIds === 'string') {
        moduleIds = [moduleIds];
    }

    var counter = 0;
    var moduleSize = moduleIds.length;
    function loaded(module) {
        counter++;
        if (counter >= moduleSize) {
            callback.apply(null, ad.plugin.loader._getModules(moduleIds));
        }
    }
    for (var i = 0; i < moduleSize; i++) {
        ad.plugin.loader._load(moduleIds[i], loaded);
    }
};

/**
 * @param {string|Array.<string>} moduleIds 需要加载的模块.
 */
ad.plugin.loader._getModules = function(moduleIds) {
    var modules = [];
    for (var i = 0; i < moduleIds.length; i++) {
        modules.push(ad.plugin.loader._cache[moduleIds[i]] || null);
    }
    return modules;
};

/**
 * @param {string} url JS文件的地址.
 * @param {Function} callback 成功的回掉函数.
 */
ad.plugin.loader._load = function(url, callback) {
    if (ad.plugin.loader._cache[url]) {
        callback(ad.plugin.loader._cache[url]);
        return;
    }

    var script = ad.plugin.loader.createElement('utf-8');
    script.src = url;
    if (document.addEventListener){
        script.onload = loadedListener;
    }
    else if (script.readyState) {
        // ie
        script.onreadystatechange = loadedListener;
    }
    ad.dom.appendScript(script);

    function loadedListener() {
        var readyState = script.readyState;
        if (typeof readyState === 'undefined' ||
           /^(?:loaded|complete)$/.test(readyState)) {
           var url = script.src;
           script.onload = script.onreadystatechange = null;
           script = null;

           // 在此之前，ECMA_define肯定被调用了
           if (ad.plugin.loader._cache[url]) {
              // 对于IE来说，是在调用ECMA_define的时候，也就是
              // ScriptNode'status === interactive的阶段更新_cache的
              callback(ad.plugin.loader._cache[url]);
           } else {
              // 对于非IE来说，是在ScriptNode'status == loaded的阶段，也就是
              // 代码执行完毕，调用onloaded的时候更新_cache的
              // 根据我们的设计，一个模块只会存在一个define()，因此不需要循环
              var module = ad.plugin.loader._wait4PreDefines.pop();
              if (module) {
                  ad.plugin.loader._cache[url] = module;
                  callback(module);
              }
           }
        }
    }
};

/**
 * 这个函数由被加载的模块主动调用.
 * @param {Object} ctor 构造函数.
 * @param {string=} opt_url 模块的路径.
 */
ad.plugin.loader.define = function(ctor, opt_url) {
    if (opt_url) {
        ad.plugin.loader._cache[opt_url] = ctor;
    } else {
        ad.plugin.loader._wait4PreDefines.push(ctor);
    }
};

/**
 * @param {string=} opt_charset 编码格式.
 * @return {HTMLScriptElement}
 */
ad.plugin.loader.createElement = function(opt_charset) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    if (opt_charset) {
        script.charset = opt_charset;
    }
    script.async = true;
    return /** @type {HTMLScriptElement} */ (script);
};

/**
 * 只会在物料的代码中调用ECMA_define(function(){ return material; });
 * @param {Function} generator 物料的模块.
 */
window['ECMA_define'] = window['ECMA_define'] || function (generator) {
    var currentNode = ad.dom.getCurrentScript();
    if (currentNode) {
        // IE，代码正在执行，我们可以获取当前的ScriptNode
        ad.plugin.loader.define(generator(), currentNode.src);
    } else {
        ad.plugin.loader.define(generator());
    }
};

/**
 * 从设计上就避免了模块以及模块之间不可能存在依赖，因此loader可以实现的很简单。
 * 这个是在投放的页面中调用，例如：
 * ECMA_require(['http://m1.js', 'http://m2.js', 'http://m3.js'], function(m1, m2, m3){
 *   // TODO
 * });
 * @param {string|Array.<string>} moduleIds 需要加载的模块.
 * @param {Function} callback 加载完毕之后的回掉函数.
 */
window['ECMA_require'] = window['ECMA_require'] || function (moduleIds, callback) {
    ad.plugin.loader.require(moduleIds, callback);
};



















/* vim: set ts=4 sw=4 sts=4 tw=100: */
