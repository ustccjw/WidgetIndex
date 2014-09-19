/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    build/phantomjs/chk_dispose.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/12/31 14:21:24$
 */

var page = require('webpage').create();
var args = require('system').args;
if (args.length === 1) {
    console.log('Try to pass some arguments when invoking this script!');
    phantom.exit();
}

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
page.onInitialized = function() {
    page.evaluate(function() {
        var callNotFromAdBase = [];
        var timeOutMap = {};
        var intervalMap = {};

        // call overrides
        overrideTimer();
        overrideEventListener();

        /**
         * 重写原生的timer函数
         */
        function overrideTimer() {
            var _setTimeout = window.setTimeout;
            window.setTimeout = function(fn, t) {
                var id = _setTimeout(fn, t);
                var white = {
                    'function () {q.onreadystatechange=baidu.fn.blank;if(h){q=null}}': 1,
                };
                if (!white[fn.toString()]) {
                    timeOutMap[id] = {
                        fn: fn.toString(),
                        t: t,
                        type: 'setTimeout',
                        id: id
                    };
                }
                var caller = arguments.callee.caller;
                if (caller !== ad.base.setTimeout && timeOutMap[id]) {
                    callNotFromAdBase.push(timeOutMap[id]);
                }
                return id;
            };

            var _clearTimeout = window.clearTimeout;
            window.clearTimeout = function(id) {
                timeOutMap[id] = null;
                _clearTimeout(id);
            };

            var _setInterval = window.setInterval;
            window.setInterval = function(fn, t) {
                var id = _setInterval(fn, t);
                var white = {
                    'function () {var f=baidu.lang.isString(b)?a[b]:b,d=(c)?c.concat([].slice.call(arguments,0)):arguments;return f.apply(a||f,d);}': 1
                };
                if (!white[fn.toString()]) {
                    intervalMap[id] = {
                        fn: fn.toString(),
                        t: t,
                        type: 'setInterval',
                        id: id
                    };
                }
                var caller = arguments.callee.caller;
                if (caller !== ad.base.setInterval && intervalMap[id]) {
                    callNotFromAdBase.push(intervalMap[id]);
                }
                return id;
            };

            var _clearInterval = window.clearInterval;
            window.clearInterval = function(id) {
                intervalMap[id] = null;
                _clearInterval(id);
            };
        }

        /**
         * 重写原生的事件监听相关函数
         */
        function overrideEventListener() {
            var _windowAddEventListener = window.addEventListener;
            window.addEventListener = function(event, listener, useCapture) {
                _windowAddEventListener.apply(this, [].slice.call(arguments));

                setListener(event, listener, useCapture, this);
            };

            var _windowRemoveEventListener = window.removeEventListener;
            window.removeEventListener = function(event, listener, useCapture) {
                _windowRemoveEventListener.apply(this, [].slice.call(arguments));

                removeListener(event, listener, useCapture, this);
            };

            var _nodeAddEventListener = Node.prototype.addEventListener;
            Node.prototype.addEventListener = function(event, listener, useCapture) {
                _nodeAddEventListener.apply(this, [].slice.call(arguments));

                setListener(event, listener, useCapture, this);
            };

            var _nodeRemoveEventListener = Node.prototype.removeEventListener;
            Node.prototype.removeEventListener = function(event, listener, useCapture) {
                _nodeRemoveEventListener.apply(this, [].slice.call(arguments));

                removeListener(event, listener, useCapture, this);
            };
        }

        function setListener(event, listener, useCapture, context) {
            if (!context._listeners) {
                context._listeners = {
                    0: {}, // propagation
                    1: {}  // capture
                };
            }
            var _listeners = context._listeners;
            var type = useCapture ? 1 : 0;
            if (!_listeners[type][event]) {
                _listeners[type][event] = [];
            }
            _listeners[type][event].push({
                'event': event,
                'listener': listener,
                'callContext': getCallContext(listener),
                'this': context
            });
        }

        function removeListener(event, listener, useCapture, context) {
            if (!context._listeners) {
                return;
            }
            var _listeners = context._listeners;
            var type = useCapture ? 1 : 0;
            if (!_listeners[type][event]) {
                return;
            }
            var list = _listeners[type][event];
            var found = -1;
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                if (item.listener === listener) {
                    found = i;
                    break;
                }
            }
            if (found > -1) {
                list.splice(found, 1);
            }
        }

        function getCallContext(listener) {
            var rootCaller = arguments.callee.caller.caller.caller;
            var planB = '/* LISTENER ITSELF */ ' + listener.toString();
            if (!rootCaller) {
                return planB;
            }
            if (typeof baidu != 'undefined' && rootCaller === baidu.event.on) {
                // 如果是通过baidu.on绑定的，那么这里返回的其实也不是listener，而是调用baidu.on的那段代码
                if (rootCaller.caller) {
                    return rootCaller.caller.toString();
                }
                else {
                    return planB;
                }
            }
            else {
                return rootCaller.toString();
            }
        }

        // 模拟PS页的bds.comm.registerUnloadHandler
        var _unHandlers = [];
        window.bds = {
            comm: {
                registerUnloadHandler: function(handler) {
                    _unHandlers.push(handler);
                },
                dispose: function() {
                    _unHandlers.forEach(function(fn) {
                        fn.call(window);
                    });
                    _unHandlers = [];
                },
                check: function() {
                    var unDisposedTimers = [];
                    Object.keys(timeOutMap).forEach(function(key) {
                        if (timeOutMap[key] != null) {
                            unDisposedTimers.push(timeOutMap[key]);
                        }
                    });
                    Object.keys(intervalMap).forEach(function(key) {
                        if (intervalMap[key] != null) {
                            unDisposedTimers.push(intervalMap[key]);
                        }
                    });
                    var unDisposedEvents = [];
                    var todo = {
                        'window': window,
                        'document': document,
                        'body': document.body
                    };
                    var white = {
                        'function b() {if(!b.isReady){b.isReady=true;for(var h=0,g=d.length;h<g;h++){d[h]()}}}': 1
                    };
                    var callContextWhite = {
                        'function () {baidu.page.getMousePosition=function(){return{x:baidu.page.getScrollLeft()+a.x,y:baidu.page.getScrollTop()+a.y}};var a={x:0,y:0};baidu.event.on(document,\"onmousemove\",function(b){b=window.event||b;a.x=b.clientX;a.y=b.clientY});}': 1,
                        'function () {var f=document.getElementsByTagName(\"IMG\"),g=f,h=f.length,d=0,l=c(),k=\"data-tangram-ori-src\",j;if(a.className){g=[];for(;d<h;++d){if(baidu.dom.hasClass(f[d],a.className)){g.push(f[d])}}}function c(){return baidu.page.getScrollTop()+baidu.page.getViewHeight()+a.preloadHeight}for(d=0,h=g.length;d<h;++d){j=g[d];if(baidu.dom.getPosition(j).top>l){j.setAttribute(k,j.src);a.placeHolder?j.src=a.placeHolder:j.removeAttribute(\"src\")}}var b=function(){var n=c(),p,q=true,o=0,m=g.length;for(;o<m;++o){j=g[o];p=j.getAttribute(k);p&&(q=false);if(baidu.dom.getPosition(j).top<n&&p){j.src=p;j.removeAttribute(k);baidu.lang.isFunction(a.onlazyload)&&a.onlazyload(j)}}q&&baidu.un(window,\"scroll\",b)};baidu.on(window,\"scroll\",b);}': 1
                    };
                    Object.keys(todo).forEach(function(key) {
                        var target = todo[key];
                        var _listeners = target._listeners;
                        if (!_listeners) {
                            return;
                        }
                        [0, 1].forEach(function(type) {
                            var map = _listeners[type];
                            Object.keys(map).forEach(function(event) {
                                var list = map[event];
                                if (list.length) {
                                    list.forEach(function(item) {
                                        var fnStr = item.listener.toString();
                                        if (white[fnStr] || callContextWhite[item.callContext]) {
                                            return;
                                        }
                                        else if (typeof baidu != 'undefined' && baidu.event._unload == item.listener) {
                                            return;
                                        }
                                        unDisposedEvents.push({
                                            'context': key,
                                            'callContext': item.callContext,
                                            'event': event,
                                            'useCapture': (type == 1)
                                        });
                                    });
                                }
                            });
                        });
                    });
                    return {
                        unDisposedTimers: unDisposedTimers,
                        callNotFromAdBase: callNotFromAdBase,
                        unDisposedEvents: unDisposedEvents
                    };
                }
            }
        };
    });
};
page.open(url, function(status){
    if (status !== 'success') {
        console.error('Unable open ' + url);
        phantom.exit(255);
    }
    runCheck();
});

function runCheck() {
    var body = page.evaluate(function(){
        bds.comm.dispose();
        var result = bds.comm.check();
        return JSON.stringify(result);
    });
    console.log(body);
    phantom.exit();
}



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
