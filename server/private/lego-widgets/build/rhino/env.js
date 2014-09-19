/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * rhino.js ~ 2013/09/09 22:47:21
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 * 对build完毕的品专代码，执行，输出css+html
 **/

var window = this;
var navigator = {};
navigator.userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.95 Safari/537.36";

var document = {
    location: {
        host: 'localhost',
        port: 80
    }
};
window.location = document.location;

var ECMA_wrapper = null;
function ECMA_define(factory){
    ECMA_wrapper = factory();
}

var appEntry = null;

if (typeof process === 'object' &&
    typeof process.version === 'string') {
    // nodejs env
    function load(file) {
        var fs = require('fs');
        var vm = require('vm');
        var code = fs.readFileSync(file).toString();
        var sandbox = {
            ECMA_define: ECMA_define,
            window: window,
            navigator: navigator,
            document: document
        };
        vm.runInContext(code, vm.createContext(sandbox), file);
    }

    function print(msg) {
        console.log(msg);
    }

    if (process.argv.length < 3) {
        console.log("node build/rhino/env.js <*.app.js>");
        process.exit(0);
    }
    appEntry = process.argv[2];
} else {
    if (!arguments || !arguments.length) {
        print("rhino build/rhino/env.js <*.app.js>");
        quit(0);
    }

    appEntry = arguments[0];
}

// 开始执行
load(appEntry);

function start() {
    var m = ECMA_wrapper.start(true);

    // FIXME(leeight) 有点儿抓狂了...
    if (m.registerAllPlugins) { m.registerAllPlugins(); }
    if (m.beforeShow) { m.beforeShow(); }

    var id = m.getId();
    var s = '<style type=\"text/css\">\n' + ECMA_wrapper.get('AD_STYLE_CONTENT').replace(/#canvas/g, '#' + id) + '\n</style>\n';
    var h = '<div id=\"' + id + '\">\n' + m.getMainHtml() + '\n</div>';
    return s + h;
};

function script() {
    var scriptName = appEntry.split(/[\/\\]/g).pop();
    return '<script>' + 'setTimeout(function(){var n=document.createElement("script");n.charset="utf-8";n.src="' + scriptName
    + '";var s=document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(n,s);}, 10 * 1000);</script>';
}

function begin() {
    return '<script>var __start=new Date().getTime();</script>';
}

function end() {
    return '<script>(typeof console != "undefined") && console.log(new Date().getTime() - __start);</script>';
}

print('<!doctype html><html><head><meta charset="utf-8" /></head><body>');
print(begin());
print(start());
print(script());
print(end());
print('</body></html>');





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
