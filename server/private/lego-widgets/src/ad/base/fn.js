/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/base/fn.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/07/23 15:16:24$
 */

goog.require('ad.lang');

goog.provide('ad.fn');

/** 
 * 为对象绑定方法和作用域
 * @param {Function|String} func 要绑定的函数，或者一个在作用域下可用的函数名
 * @param {Object} scope 执行运行时this，如果不传入则运行时this为函数本身
 * @param {...*} var_args 函数执行时附加到执行时函数前面的参数
 * @return {Function} 封装后的函数
 */
ad.fn.bind = function(func, scope, var_args) {
    var xargs = arguments.length > 2
        ? [].slice.call(arguments, 2)
        : null;

    var fn = ad.lang.isString(func) ? scope[func] : func;
    var thisObject = scope || fn;
    var nativeBind = Function.prototype.bind;
    if (nativeBind) {
        var args = [].slice.call(arguments, 2);
        args.unshift(thisObject);
        return nativeBind.apply(fn, args);
    }
    else {
        return function() {
            var args = xargs
                ? xargs.concat([].slice.call(arguments, 0))
                : arguments;
            return fn.apply(thisObject, args);
        };
    }
};

/**
 * When defining a class Foo with an abstract method bar(), you can do:
 *
 * Foo.prototype.bar = goog.abstractMethod
 *
 * Now if a subclass of Foo fails to override bar(), an error
 * will be thrown when bar() is invoked.
 *
 * Note: This does not take the name of the function to override as
 * an argument because that would make it more difficult to obfuscate
 * our JavaScript code.
 *
 * @type {!Function}
 * @throws {Error} when invoked to indicate the method should be
 *   overridden.
 */
ad.fn.abstractMethod = function() {
    throw Error('unimplemented abstract method');
};
/**
 * 这是一个空函数，用于需要排除函数作用域链干扰的情况.
 */
ad.fn.blank = function () {};

/**
 * 将一个静态函数变换成一个对象的方法，使其的第一个参数为this，或this[attr]
 * @param {Function}	func	要方法化的函数
 * @param {string}		[attr]	属性
 * @returns {Function} 已方法化的函数
 */
ad.fn.methodize = function(func, attr) {
    return function() {
        return func.apply(this, [ (attr ? this[attr] : this) ].concat([].slice.call(arguments)));
    };
};

/**
 * 包装函数的返回值，使其在能按照index指定的方式返回。<br/>如果其值为-1，直接返回返回值。 <br/>如果其值为0，返回"返回值"的包装结果。<br/> 如果其值大于0，返回第i个位置的参数的包装结果（从1开始计数）
 * @param {function} func    需要包装的函数
 * @param {function} Wrapper 包装器
 * @param {number} mode      包装第几个参数
 * @return {function} 包装后的函数
 */
ad.fn.wrapReturnValue = function(func, Wrapper, mode) {
    mode = mode | 0;
    return function() {
        var ret = func.apply(this, arguments);

        if (mode > 0) {
            return new Wrapper(arguments[ mode - 1 ]);
        }
        if (!mode) {
            return new Wrapper(ret);
        }
        return ret;
    };
};

/**
 * 对函数进行集化，使其在第一个参数为array时，结果也返回一个数组
 * @param {Function}	func 		需要包装的函数
 * @param {Boolean}		[recursive] 是否递归包装（如果数组里面一项仍然是数组，递归），可选
 * @return {Function} 已集化的函数
 */
ad.fn.multize = function(func, recursive) {
    var newFunc = function() {
        var list = arguments[0];
        var fn = recursive ? newFunc : func;
        var ret = [];
        var moreArgs = [].slice.call(arguments, 0);
        var i = 0;
        var len;
        var r;

        if (list instanceof Array) {
            for (len = list.length; i < len; i++) {
                moreArgs[0] = list[i];
                r = fn.apply(this, moreArgs);
                ret.push(r);
            }
            return ret;
        }
        else {
            return func.apply(this, arguments);
        }
    };
    return newFunc;
};














/* vim: set ts=4 sw=4 sts=4 tw=100 : */
