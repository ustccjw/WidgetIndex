/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * src/ad/plugin/asp_loader.js ~ 2013/07/18 13:20:37
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 * 如果广告是通过ASP异步获取的，使用这个loader来完成广告的投放。
 **/
goog.require('ad.plugin.loader');

goog.provide('ad.plugin.AspLoader');

if (!window['arrBaiduAds']) {
    window['arrBaiduAds'] = [];
}

/**
 * @param {string} url ASP的URL地址
 * @param {Function} callback 回调函数，参数是material的实例
 * @export
 */
function ECMA_ASP_require(url, callback) {
    // this._requestUrl = 'http://a.baidu.com/ecom?di=641&tm=baiduASPGBannerTRH&lang=3&word=';
    // 返回的内容里面肯定是这种格式的：
    // arrBaiduAds[${di}]=".....";

    var match = /\bdi=(\d+)\b/.exec(url);
    if (!match) {
        throw new Error('Invalid url format');
    }

    var di = match[1];
    var script = ad.plugin.loader.createElement('gbk');
    script.src = url;
    script.onload = script.onreadystatechange = function() {
        var readyState = script.readyState;
        if (!readyState || /^(loaded|complete)$/.test(readyState)) {
            var htmlFragment = window['arrBaiduAds'][di];
            if (!htmlFragment) {
                return;
            }

            // 开始从htmlFragment中把需要的内容提取出来
            // 常见的两种格式：
            // 1. <script src="ad.js"></script>（企业知道，视频...）@xueliang @minming
            // 2. <script>var AD_CONFIG={};var RT_CONFIG={};var LINKS=[];</script>
            //    <script src="ad.js"></script>（图片）@wangdawei04
            // 对于第一种情况，
            var fragment = document.createDocumentFragment();
            var context = fragment.appendChild(document.createElement('div'));
            // 必须存在PREFIX，否则IE下面无法获取到scripts element
            context.innerHTML = "PREFIX" + htmlFragment;

            var rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
            var rscriptType = /^$|\/(?:java|ecma)script/i;
            var rtrim = /(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g;
            var urls = [];
            var scripts = context.getElementsByTagName('script');
            for (var i = 0; i < scripts.length; i ++) {
                var node = scripts[i];
                if (rscriptType.test(node.type)) {
                    if (node.src) {
                        urls.push(node.src);
                    } else {
                        var code = (node.text || node.textContent || node.innerHTML || "")
                                   .replace(rcleanScript, "").replace(rtrim, "");
                        if (code) {
                            ad.base.globalEval(code);
                        }
                    }
                }
            }

            if (urls.length) {
                ECMA_require(urls, function(){
                    callback.apply(null, arguments);
                });
            } else {
                callback.call(null);
            }
        }
    };

    var parent = (document.getElementsByTagName('head')[0] || document.body);
    parent.insertBefore(script, parent.firstChild);
}

















/* vim: set ts=4 sw=4 sts=4 tw=100: */
