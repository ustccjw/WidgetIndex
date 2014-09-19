/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/base/lang.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/07/23 15:17:38$
 */

goog.provide('ad.lang');

/**
 * 判断目标参数是否string类型或String对象
 * @param {*} source 目标参数
 * @return {boolean} 类型判断结果
 */
ad.lang.isString = function(source) {
    return '[object String]' === Object.prototype.toString.call(source);
};

/**
 * 判断目标参数是否为function或Function实例
 * @param {*} source 目标参数
 * @return {boolean} 类型判断结果
 */
ad.lang.isFunction = function (source) {
    // chrome下,'function' == typeof /a/ 为true.
    return '[object Function]' === Object.prototype.toString.call(source);
};
/**
 * 判断目标参数是否Array对象
 * @param {*} source 目标参数
 * @return {boolean} 类型判断结果
 */
ad.lang.isArray = function(source) {
    return '[object Array]' === Object.prototype.toString.call(source);
};



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
