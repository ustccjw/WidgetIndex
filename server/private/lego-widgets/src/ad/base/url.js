/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/base/url.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/07/29 12:39:49$
 */

goog.require('ad.string');
goog.require('ad.object');
goog.require('ad.lang');

goog.provide('ad.url');

/**
 * 对字符串进行%&+/#=和空格七个字符进行url转义
 * @param {string} source 需要转义的字符串
 * @return {string} 转义之后的字符串.
 */
ad.url.escapeSymbol = function(source) {
    return String(source).replace(/%/g, '%25')
        .replace(/&/g, '%26')
        .replace(/\+/g, '%2B')
        .replace(/ /g, '%20')
        .replace(/\//g, '%2F')
        .replace(/#/g, '%23')
        .replace(/=/g, '%3D');
};

/**
 * 根据参数名从目标URL中获取参数值
 * @param {string} url 目标URL
 * @param {string} key 要获取的参数名
 * @return {?string} 获取的参数值，获取不到时返回null
 */
ad.url.getQueryValue = function(url, key) {
    var reg = new RegExp(
        '(^|&|\\?|#)' + ad.string.escapeReg(key) + '=([^&#]*)(&|$|#)',
        ''
    );
    var match = url.match(reg);
    if (match) {
        return match[2];
    }

    return null;
};

/**
 * 将json对象解析成query字符串
 * @param {Object} json 需要解析的json对象
 * @param {Function=} opt_replacer 对值进行特殊处理的函数，function(value, key)
 * @return {string} 解析结果字符串
 */
ad.url.jsonToQuery = function(json, opt_replacer) {
    var result = [];
    var itemLen;
    var replacer = opt_replacer || function(value) {
        return ad.url.escapeSymbol(value);
    };

    ad.object.each(json, function(item, key) {
        // 这里只考虑item为数组、字符串、数字类型，不考虑嵌套的object
        if (ad.lang.isArray(item)) {
            itemLen = item.length;
            // FIXME value的值需要encodeURIComponent转义吗？
            while (itemLen--) {
                result.push(key + '=' + replacer(item[itemLen], key));
            }
        }
        else {
            result.push(key + '=' + replacer(item, key));
        }
    });

    return result.join('&');
};

/**
 * 解析目标URL中的参数成json对象
 * @param {string} url 目标URL
 * @return {Object} 解析结果对象
 */
ad.url.queryToJson = function(url) {
    var query = url.substr(url.lastIndexOf('?') + 1);
    var params = query.split('&');
    var len = params.length;
    var result = {};

    for (var i = 0; i < len; i++) {
        if (!params[i]) {
            continue;
        }
        var param = params[i].split('=');
        var key = param[0];
        var value = param[1];

        var item = result[key];
        if ('undefined' === typeof item) {
            result[key] = value;
        }
        else if (ad.lang.isArray(item)) {
            item.push(value);
        }
        else { // 这里只可能是string了
            result[key] = [item, value];
        }
    }

    return result;
};

/**
 * 获取真实的路径.
 *
 * @param {string} path .
 * @return {string} real path.
 */
ad.url.realpath = function (path) {
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
};

/**
 * 获取路径的目录
 *
 * @param {string} path .
 * @return {string} .
 */
ad.url.dirname = function (path) {
    var DIRNAME_RE = /[^?]*(?=\/.*$)/;
    var s = path.match(DIRNAME_RE);
    return (s ? s[0] : '.') + '/';
};

/**
 * 在https环境下面，对于一些hard code url进行转化。
 * 例如rcv2插件发起请求的时候，是需要从RT_CONFIG['RCV2_URL']来获取
 * 可以发送数据的地址的，这个RCV2_URL是
 * 1. http://bzclk.baidu.com/adrc.php
 * 2. http://www.baidu.com/adrc.php
 * 我们调用baidu.sio.log的时候，如果在https环境下面，是需要转换一下host的。
 * 至于为什么检索端输出的时候没有进行处理，只要因为检索端不支持嵌套的占位符。
 *
 * %BEGIN_LINK%%BEGIN_HOST%bzclk.baidu.com%END_HOST%%END_LINK%
 *
 * @param {string} url 可能是hard code的，也可能是后端传过来的.
 * @param {boolean=} opt_https 主要是测试用的，跳过那个判断.
 * @return {string} 改写host之后的url
 */
ad.url.normalize = function(url, opt_https) {
    if (opt_https || document.location.protocol === 'https:') {
        var pattern = /^(https?:\/\/([^\/]+))/;
        var match = pattern.exec(url);
        if (!match) {
            return url;
        }

        var host = match[2];
        var httpsHost = RT_CONFIG.HOST(host);
        return url.replace(match[1], httpsHost);
    }
    else {
        return url;
    }
};

















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
