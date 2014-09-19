/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * ../phantomjs/chk_anchor.js ~ 2014-01-08 16:01:46
 * @author xiongjie01
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
        function getXPath(element, rootElm) {
            if (element === rootElm) {
                return rootElm.tagName;
            }

            var ix = 0;
            var siblings = element.parentNode.childNodes;
            var sibling;
            for (var i = 0, l = siblings.length; i < l; i++) {
                sibling = siblings[i];
                if (sibling === element) {
                    return getXPath(element.parentNode, rootElm) + '/' + element.tagName + '[' + (ix + 1) + ']';
                }
                if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
                    ix++;
                }
            }

            return '';
        };
        var invalidAnchorsXpath = [];
        if (!/\/landmark|siva\//.test(location.href)) {
          [].forEach.call(document.getElementsByTagName('A'), function(element) {
            var styles = window.getComputedStyle(element, null);
            var colorValue = styles.getPropertyValue('color');
            if (colorValue == 'rgb(0, 0, 204)' && !element.classList.contains('ec-name')) {
              invalidAnchorsXpath.push(getXPath(element, document.body));
            }
          });
        }

        return JSON.stringify({invalidAnchorsXpath: invalidAnchorsXpath});
    });
    console.log(body);
    phantom.exit();
}





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
