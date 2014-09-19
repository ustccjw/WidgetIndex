/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * tools/gen_app_benchmark.js ~ 2013/08/09 22:46:36
 * @author liyubei(liyubei@baidu.com)
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
        [].forEach.call(document.querySelectorAll('script'), function(element){
            element.parentNode.removeChild(element);
        });

        //屏蔽日期变化造成的Fail //已经不需要
        // [].forEach.call(document.querySelectorAll('.ad-widget .site'), function(element) {
        //     var html = element.innerHTML.toString().replace(/\d{4}-\d{2}/, '0000-00');
        //     element.innerHTML = html;
        // });

        var nodeIterator = document.createNodeIterator(document,
            NodeFilter.SHOW_TEXT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_ELEMENT, null, false);
        var node;
        while ((node = nodeIterator.nextNode())) {
            if (node.nodeType === Node.COMMENT_NODE) {
                node.parentNode.removeChild(node);
            } else if (node.nodeType === Node.TEXT_NODE) {
                if (!node.textContent.trim()) {
                    // 避免内容都在一行里面，这样子以后内容有变化的时候，很容易通过
                    // svn diff或者git diff了解到影响的内容.
                    node.textContent = "\n";
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                // 很多*.config.js配置的不合理，导致出现了这样子的内容
                // data-url="http://localhost:8964/src/ad/impl/www.baidu1.com"
                // data-mu="http://localhost:8964/src/ad/impl/lv.app.html"
                // 我们需要归一化为
                // data-url="www.baidu1.com"
                var dataUrl = node.getAttribute("data-url");
                if (dataUrl) {
                    var lastSlashIndex = location.href.lastIndexOf('/');
                    var prefix = location.href.substring(0, lastSlashIndex + 1);
                    if (dataUrl === location.href) {
                        node.setAttribute("data-url", "");
                    } else if (dataUrl.indexOf(prefix) === 0) {
                        node.setAttribute("data-url", dataUrl.replace(prefix, ''));
                    }
                }
            }
        }

        var globalVarWhiteList = [
            'html5', 'innerHeight', 'offscreenBuffering',
            'innerWidth', 'devicePixelRatio', 'callPhantom',
            'Post_Video_URL', 'printStackTrace', 'length', 'RES'
        ];
        var body = document.body.innerHTML;
        var globals = [];
        for (var key in window) {
            if (globalVarWhiteList.indexOf(key) != -1) {
                continue;
            }
            var value = window[key];
            if (value &&
                /object/.test(typeof value) &&
                (value.toString() != '[object Object]')) {
                continue;
            }

            if (value &&
                /function/.test(typeof value) &&
                (/native code/.test(value.toString()))) {
                continue;
            }
            if (value) {
                globals.push(key);
            }
        }

        return JSON.stringify({body: body, globals: globals.sort()});
    });
    console.log(body);
    phantom.exit();
}



















/* vim: set ts=4 sw=4 sts=4 tw=100: */
