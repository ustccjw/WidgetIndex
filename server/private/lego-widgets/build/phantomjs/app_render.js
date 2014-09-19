/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: app_render.js 11047 2012-08-09 02:54:18Z liyubei $
 *
 **************************************************************************/



/**
 * build/phantomjs/app_render.js ~ 2012/07/02 13:21:15
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 11047 $
 * @description
 *
 **/

var page = require('webpage').create(),
    system = require('system');
page.viewportSize = { width: 1024, height : 768 };
page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.151 Safari/535.19';

var url = system.args[1];
var file = system.args[2];

if (!url || !file) {
    console.log("phantomjs build/phantomjs/app_render.js <url> <output>");
    phantom.exit(1);
}


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

page.open(url, function(status) {
    if (status !== 'success') {
        console.log("Unable to render '" + url + "'");
        return;
    }

    page.evaluate(function() {
        document.body.style.backgroundColor = 'white';
        return;

        var mask = document.createElement('div');
        mask.style.position = 'absolute';
        mask.style.top = '0px';
        mask.style.left = '0px';
        mask.style.width = document.documentElement.scrollWidth + 'px';
        mask.style.height = document.documentElement.scrollHeight + 'px';
        mask.style.zIndex = '800';
        mask.style.opacity = '0.3';
        mask.style.backgroundColor = 'black';
        document.body.appendChild(mask);

        var canvas = document.getElementById('canvas');
        if (canvas) {
            canvas.style.backgroundColor = 'white';
            canvas.style.position = 'relative';
            canvas.style.zIndex = '1000';
            canvas.style.webkitBoxShadow = '0 0 5px 5px #000';
        }
    });
    setTimeout(function(){
        page.render(file);
        phantom.exit(0);
    }, 1000);
});



















/* vim: set ts=4 sw=4 sts=4 tw=100: */
