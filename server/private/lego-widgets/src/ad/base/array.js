/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/base/array.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/07/23 15:12:40$
 */

goog.provide('ad.array');

/**
 * 遍历数组中所有元素
 * each方法不支持对Object的遍历,对Object的遍历使用baidu.object.each 。
 * @param {Array} source 需要遍历的数组
 * @param {Function} iterator 对每个数组元素进行调用的函数，
 *                  该函数有两个参数，
 *                      第一个为数组元素，
 *                      第二个为数组索引值，
 *                      function (item, index)。
 * @param {Object=} opt_thisObject 函数调用时的this指针，
 *                  如果没有此参数，默认是当前遍历的数组
 * @returns {Array} 遍历的数组
 */

ad.array.forEach = ad.array.each = function (source, iterator, opt_thisObject) {
    var returnValue;
    var item;
    var i;
    var len = source.length;

    if ('function' === typeof iterator) {
        for (i = 0; i < len; i++) {
            item = source[i];
            // TODO
            // 此处实现和标准不符合，标准中是这样说的：
            // If a thisObject parameter is provided to forEach,
            // it will be used as the this for each invocation of the callback.
            // If it is not provided, or is null,
            // the global object associated with callback is used instead.
            returnValue = iterator.call(opt_thisObject || source, item, i);

            if (returnValue === false) {
                break;
            }
        }
    }
    return source;
};

















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
