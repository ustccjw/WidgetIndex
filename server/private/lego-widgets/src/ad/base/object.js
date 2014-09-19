/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/base/object.js
 * author:  zhouminming01
 * version: $Revision$
 * date:    $Date: 2014/07/28 15:16:44$
 */

goog.provide('ad.object');

/**
 * 遍历Object中所有元素
 * @param {Object} source 需要遍历的Object
 * @param {Function} iterator 对每个Object元素进行调用的函数，function (item, key)
 * @returns {Object} 遍历的Object
 */
ad.object.each = function(source, iterator) {
    if ('function' === typeof iterator) {
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                var item = source[key];
                var returnValue = iterator.call(source, item, key);
                if (returnValue === false) {
                    break;
                }
            }
        }
    }
    return source;
};

/**
 * 将源对象的所有属性拷贝到目标对象中
 * 1.目标对象中，与源对象key相同的成员将会被覆盖。<br>
 * 2.源对象的prototype成员不会拷贝。
 * @param {Object} target 目标对象
 * @param {Object} source 源对象
 * @return {Object} 目标对象
 */
ad.object.extend = function (target, source) {
    for (var p in source) {
        if (source.hasOwnProperty(p)) {
            target[p] = source[p];
        }
    }
    return target;
};

/**
 * 判断一个对象是不是字面量对象，即判断这个对象是不是由{}或者new Object类似方式创建
 * 事实上来说，在Javascript语言中，任何判断都一定会有漏洞，因此本方法只针对一些最常用的情况进行了判断
 * @param {Object} obj 需要检查的对象
 * @return {boolean} 检查结果
 */
ad.object.isPlain  = function(obj) {
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var key;
    if (!obj ||
         // 一般的情况，直接用toString判断
         Object.prototype.toString.call(obj) !== '[object Object]' ||
         // IE下，window/document/document.body/HTMLElement/HTMLCollection/NodeList等DOM对象上一个语句为true
         // isPrototypeOf挂在Object.prototype上的，因此所有的字面量都应该会有这个属性
         // 对于在window上挂了isPrototypeOf属性的情况，直接忽略不考虑
         !('isPrototypeOf' in obj)
       ) {
        return false;
    }

    // 判断new fun()自定义对象的情况
    // constructor不是继承自原型链的
    // 并且原型中有isPrototypeOf方法才是Object
    if (obj.constructor
        && !hasOwnProperty.call(obj, 'constructor')
        && !hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
        return false;
    }
    // 判断有继承的情况
    // 如果有一项是继承过来的，那么一定不是字面量Object
    // OwnProperty会首先被遍历，为了加速遍历过程，直接看最后一项
    // jshint ignore:start
    for (key in obj) {
        continue;
    }
    // jshint ignore:end
    return key === undefined || hasOwnProperty.call(obj, key);
};




















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
