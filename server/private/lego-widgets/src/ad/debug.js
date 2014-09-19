/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: debug.js 18382 2013-03-14 14:44:55Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/debug.js ~ 2012/06/04 16:51:41
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 18382 $
 * @description
 *
 **/

goog.require('base.ParallelWorkerManager');
goog.require('jn.net.TemplateWorker');
goog.require('ad.Wrapper');
goog.require('ad.flags');
goog.require('ad.env');

goog.provide('ad.Debug');


/**
 * @param {function(boolean=)} main 主函数.
 */
ad.Debug = function(main) {
    ad.Launch(main);
};

/**
 * @param {function(boolean=)} main 主函数.
 */
ad.Launch = function(main) {
    function dirname(path) {
        var DIRNAME_RE = /[^?]*(?=\/.*$)/;
        var s = path.match(DIRNAME_RE);
        return (s ? s[0] : '.') + '/';
    }

    function realpath(path) {
        var MULTIPLE_SLASH_RE = /([^:\/])\/\/+/g;
        // 'file:///a//b/c' ==> 'file:///a/b/c'
        // 'http://a//b/c' ==> 'http://a/b/c'
        // 'https://a//b/c' ==> 'https://a/b/c'
        if (path.lastIndexOf('//') > 7) {
            path = path.replace(MULTIPLE_SLASH_RE, '$1\/');
        }

        // If 'a/b/c', just return
        if (path.indexOf('.') === -1) {
            return path;
        }

        var original = path.split('/');
        var ret = [];
        var part;

        for (var i = 0; i < original.length; i++) {
            part = original[i];

            if (part === '..') {
                if (ret.length === 0) {
                    throw new Error('The path is invalid: ' + path);
                }
                ret.pop();
            }
            else if (part !== '.') {
                ret.push(part);
            }
        }

        return ret.join('/');
    }

    function getAbsoluteUrl(url) {
        if (url.indexOf('http://') === -1) {
            url = dirname(location.href.replace(/\?.*/, '')) + url;
        }
        return realpath(url);
    }

    function combinedUris(uris) {
        // @see http://support.microsoft.com/kb/208427
        // if the request url length is more than 2083, the internet explorer
        // will drop that request, never make it happen. :-(
        // in order to address this issue, we have to split the uris into chunks.
        var uri = '';
        var uriChunks = [];

        for (var i = 0; i < uris.length; i++) {
            // I dont know why it works, but it does work.

            // IE6下面，当前页面的地址是
            // == 情况1 ==
            // http://jntest.baidu.com:8080/src/jn/landmark/promotion/material_list.app.html?combine_css=1#/jn/landmark/promotion/material_list~status=0&keyword=&adId=0
            // 请求的资源地址是
            // ../../../css/*.css
            // ../../../jn/*.css
            // == 情况2 ==
            // http://jntest.baidu.com:8080/src/entry/gold.html?enable_debug=1&combine_css=1
            // 请求的资源地址是
            // ../../src/css/*.css
            // 我们的目的是获取绝对路径
            uris[i] = getAbsoluteUrl(uris[i]);
            uris[i] = uris[i].replace(/http:\/\/([^\/]+)\//g, '/');
        }

        for (var i = 0; i < uris.length; i++) {
            if (encodeURIComponent(uri + uris[i] + ',').length > 800) {
                uriChunks.push(uri);
                uri = uris[i];
            } else {
                uri += (',' + uris[i]);
            }
        }
        if (uri) {
            uriChunks.push(uri);
        }

        return uriChunks;
    }

    function getRequestId() {
        return Math.floor(Math.random() * 2147483648).toString(36);
    }

    if (!COMPILED) {
        baidu.dom.ready(function() {
            var pwm = new base.ParallelWorkerManager();
            var doc = goog.global.document;
            var head = doc.getElementsByTagName('head')[0];
            // @see http://blogs.msdn.com/b/ieinternals/archive/2011/05/14
            // /internet-explorer-stylesheet-rule-selector-import-sheet-limit-maximum.aspx
            // TODO 解决IE只能加载32个外部样式文件的BUG
            if (/cc=1|combine_css=1/.test(document.location.search)) {
                // XXX Need run Fserver
                var requestId = getRequestId();
                var chunks = combinedUris(goog.asyncStyles);
                for (var i = 0; i < chunks.length; i++) {
                    var styleElt = doc.createElement('LINK');
                    styleElt.setAttribute('type', 'text/css');
                    styleElt.setAttribute('rel', 'stylesheet');
                    styleElt.setAttribute('href', '/combine/all.css?uris=' +
                      encodeURIComponent(chunks[i]) +
                      '&.timestamp=' + Math.random() +
                      '&requestId=' + requestId +
                      '&index=' + i +
                      '&count=' + chunks.length);
                    head.appendChild(styleElt);
                }
            }
            else {
                var iAmFe = goog.isDebugMode();
                var nocc = /nc=1/.test(document.location.search) || document.location.host === 'git.jumbo.ws';
                for (var i = 0; i < goog.asyncStyles.length; i++) {
                    var styleElt = doc.createElement('LINK');
                    var url = goog.asyncStyles[i];
                    styleElt.setAttribute('type', 'text/css');
                    styleElt.setAttribute('rel', 'stylesheet');
                    if (url.indexOf('.less') > -1) {
                        // nc=1参数默认是没有的，所以nocc默认是false，跟原来的逻辑是一致的.
                        if (iAmFe && !nocc) {
                            // I'm the FE, and maybe i'm using the Fserver
                            url = getAbsoluteUrl(url);
                            url = url.replace(/http:\/\/([^\/]+)\//g, '/');
                            styleElt.setAttribute('href', '/combine/all.css?uris=' +
                              encodeURIComponent(url) + '&.timestamp=' + Math.random());
                        }
                        else {
                            // I'm the RD
                            url = url.replace('.less', '.compiled.css');
                            styleElt.setAttribute('href', url + '?.timestamp=' + Math.random());
                        }
                    }
                    else {
                        styleElt.setAttribute('href', url + '?.timestamp=' + Math.random());
                    }
                    head.appendChild(styleElt);
                }
            }

            if (goog.asyncResource.length > 0) {
                if (/ct=1|combine_tpl=1/.test(document.location.search)) {
                    var chunks = combinedUris(goog.asyncResource);
                    for (var i = 0; i < chunks.length; i++) {
                        pwm.addWorker(new jn.net.TemplateWorker(
                            ['/combine/tpl.html?uris=' + encodeURIComponent(chunks[i])]));
                    }
                } else {
                    pwm.addWorker(new jn.net.TemplateWorker(goog.asyncResource));
                }
            }

            pwm.addDoneListener(main);
            pwm.start();
        });
    } else {
        er.template.parse(AD_TEMPLATE_CONTENT);
        if (!FLAGS_use_amd_define) {
            // TODO: 这是个临时解决方案，最终需要素材库后端渲染时新增FLAG_is_server来解决
            // 背景：图加页面有ECMA_define，但是需要同步展示。需要有一个东西来区分到底是处于后端渲染环境还
            // 是图加环境
            var isServer = false;
            try {
                window['__ignore'] = document.getElementById('whatever');
            }
            catch (e) {
                isServer = true;
            }

            /* jshint ignore:start */
            if (FLAGS_as_dup_module && typeof BAIDU_DUP_define === 'function') {
                BAIDU_DUP_define('%MATERIAL_BCS_URL%', [], function() {
                    return new ad.Wrapper(main);
                });
            }
            else if (typeof ECMA_define === 'function' && (isServer || !FLAGS_img_sync)) {
                ECMA_define(function() {
                    return new ad.Wrapper(main);
                });
            }
            else {
                main();
            }
            /* jshint ignore:end */
        }
        else {
            var amd = false;
            if (typeof ESL_define === 'function') {
                /* jshint ignore:start */
                ESL_define(function() {
                    return new ad.Wrapper(main);
                });
                /* jshint ignore:end */
                amd = true;
            }
            if (typeof define === 'function') {
                define(function() {
                    return new ad.Wrapper(main);
                });
                amd = true;
            }
            if (!amd) {
                main();
            }
        }
    }
};



/* vim: set ts=4 sw=4 sts=4 tw=100: */
