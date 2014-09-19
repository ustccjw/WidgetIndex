/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * ../phantomjs/chk_class.js ~ 2013/09/09 20:47:16
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 *  
 **/
var page = require('webpage').create();
var args = require('system').args;
if (args.length === 1) {
    console.log('Try to pass some arguments when invoking this script!');
    phantom.exit();
}

// var url = 'http://leeight.baidu.com:8964/src/ad/impl/benz_china.app.html';
// var url = 'http://cq01-rdqa-pool017.cq01.baidu.com:8964/src/ad/widget/image_cartoon.app.html';
// var url = 'http://cq01-rdqa-pool017.cq01.baidu.com:8964/src/ad/widget/flash.app.html';
// var url = 'http://cq01-rdqa-pool017.cq01.baidu.com:8964/src/ad/widget/small_weibo.app.html';

var url = args[1];
page.onError = function(msg, trace) {
    var msgStack = ['ERROR: ' + msg];
    if (trace && trace.length) {
        msgStack.push('TRACE:');
        trace.forEach(function(t) {
            msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : ''));
        });
    }
    console.error(msgStack.join('\n'));
    phantom.exit(255);
}
page.open(url, function(status){
    if (status !== 'success') {
        console.error('Unable open ' + url);
        phantom.exit(255);
    }
    setTimeout(function(){
        dumpBody();
    }, 10);
});

function dumpBody() {
    var body = page.evaluate(function(){
        var whiteList = ['canvas', 'layout',
            // 百度分享白名单
            'mshare', 'qqkj', 'xlwb', 'bdsc', 'rrw', 'txwb', 'bdxc', 'goWebsite', 
            'bdsharebuttonbox', 'bdshare-button-style0-16'
        ];

        var whiteListPattern = new RegExp('^\\.(' +
          // ad-|ec- 期望的情况
          'ad-|ec-|' +
          // app-|bd-app- 阿拉丁APP的白名单
          'app-|bd-app-|' +
          // bds_|bdshare_t|bdlikebutton|bdsharebox 百度分享的白名单
          'bds_|bdshare_t|bdlikebutton|bdsharebox|' +
          //大搜下拉框控件,滚动条控件
          'c-dropdown2|opui-scroll-|' +
          // threadlist|j_ 贴吧frs页面的白名单
          'threadlist|j_|' +
          // ui-|month|year|previous|next|disabled|focused hotel_form.app.html的白名单
          'ui-|month|year|previous|next|disabled|focused|' +
          // PS页面的容器
          'container_s|container_l|content_right|c-input|c-btn|c-btn-primary|c-gap-right|' +
          // layout
          'layout|' +
          // "V"认证
          'icons|EC_PP|c-icon|icon-certify|c-icon-v|efc-cert|_ecui_tips|' +
          // PS下拉菜单
          'c-tools|c-tip-icon|c-icon|c-icon-triangle-down-g|c-trust' +
        ')');
        var invalidClassList = [];
        [].forEach.call(document.getElementsByTagName('*'), function(element) {
            if (element.nodeName === 'STYLE') {
                return;
            }

            var items = element.classList;
            for (var i = 0; i < items.length; i ++) {
                var clsName = items[i];

                if (whiteList.indexOf(clsName) != -1) {
                    continue;
                }

                if (!whiteListPattern.test('.' + clsName)) {
                    invalidClassList.push(clsName);
                }
            }
        });

        var selectorTexts = [];
        var styleSheets = document.styleSheets;
        for (var i = 0; i < styleSheets.length; i ++) {
            var styleSheet = styleSheets[i];
            if (!styleSheet.href || styleSheet.href.indexOf('combine/all.css') === -1) {
                continue;
            }

            var cssRules = styleSheet.cssRules;
            for (var j = 0; j < cssRules.length; j ++) {
                var cssRule = cssRules[j];
                var selectorText = cssRule.selectorText;
                selectorTexts.push(selectorText);
            }
        }

        return JSON.stringify({invalidClassList: invalidClassList, selectorTexts: selectorTexts});
    });
    console.log(body);
    phantom.exit();
}





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
