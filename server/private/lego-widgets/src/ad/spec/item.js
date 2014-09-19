/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/spec/item.js
 * desc:    spec item基类
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/08/01 19:43:18$
 */

goog.provide('ad.spec.Item');
goog.provide('ad.spec.ItemType');

/**
 * 配置项基类
 * @param {Object} pref 表单配置项
 * @param {string=} opt_np 由name(即key)组成的name path
 * @param {string=} opt_dnp 由displayName组成的display name path
 * @constructor
 */
ad.spec.Item = function(pref, opt_np, opt_dnp) {
    /**
     * @type {Array.<Object>|Object}
     */
    this.pref = pref;

    /**
     * @type {string}
     */
    this.namePath = opt_np || '';

    /**
     * @type {string}
     */
    this.displayNamePath = opt_dnp || '';

    /**
     * @type {ad.spec.ItemType}
     */
    this.type = ad.spec.ItemType.UNSPECIFIED;
};

/**
 * 获取spec item的name
 * @return {string}
 */
ad.spec.Item.prototype.getName = function() {
    return this.pref['name'] || '';
};

/**
 * 获取spec item的name path
 * @param {string=} opt_suffix 后缀
 * @return {string}
 */
ad.spec.Item.prototype.getNamePath = function(opt_suffix) {
    return this.namePath + (opt_suffix || '');
};

/**
 * 获取spec item的display name path
 * @param {string=} opt_suffix 后缀
 * @return {string}
 */
ad.spec.Item.prototype.getDisplayNamePath = function(opt_suffix) {
    return this.displayNamePath + (opt_suffix || '');
};

/**
 * 获取spec item的extraAttr
 * @param {string} opt_key 键
 * @return {string}
 */
ad.spec.Item.prototype.getExtraAttr = function(opt_key) {
    if (!this.pref['extraAttr']) {
        return null;
    }
    if (opt_key) {
        return this.pref['extraAttr'][opt_key];
    }
    else {
        return this.pref['extraAttr'];
    }
};

/**
 * 获取item的value
 * @return {*}
 */
ad.spec.Item.prototype.getValue = function() {
    return this.value;
};

/**
 * 设置item的value
 * @param {*} value 要设置的值
 */
ad.spec.Item.prototype.setValue = function(value) {
    this.value = value;
};

/**
 * item是否有值
 * @return {boolean}
 */
ad.spec.Item.prototype.hasValue = function() {
    return this.value != null;
};

/**
 * 获取Item类型
 * @return {ad.spec.ItemType}
 */
ad.spec.Item.prototype.getType = function() {
    return this.type;
};

/**
 * 解析json path里的[start:end:step] [*] [1] [1,3]
 * @param {string} loc 数组下标
 * @param {number} len 数组长度
 * @return {Array.<number>}
 */
ad.spec.Item.parseArrayIndex = function(loc, len) {
    var indexes = [];
    if (loc === '*') { // [*]
        for (var i = 0; i < len; i++) {
            indexes.push(i);
        }
    }
    else if (/\d+/.test(loc) && parseInt(loc, 10) >= 0 && parseInt(loc, 10) < len) { // [1]
        var index = parseInt(loc, 10);
        indexes.push(index);
    }
    else if (/^(-?\d*):(-?\d*):?(\d*)$/.test(loc)) { // [1:5]
        var start = 0;
        var end = len;
        var step = 1;
        var pattern = /^(-?\d*):(-?\d*):?(-?\d*)$/g;
        var match = loc.match(pattern);
        if (match) {
            start = parseInt(match[1] || start, 10);
            end = parseInt(match[2] || end, 10);
            step = parseInt(match[3] || step, 10);
        }
        start = (start < 0) ? Math.max(0, start + len) : Math.min(len, start);
        end = (end < 0) ? Math.max(0, end + len) : Math.min(len, end);
        for (var i = start; i < end; i += step) {
            indexes.push(i);
        }
    }
    else if (/,/.test(loc)) { // [1,3,...]
        for (var s = loc.split(/'?,'?/), i = 0, n = s.length; i < n; i++) {
            indexes.push(parseInt(s[i], 10));
        }
    }
    else {
        throw 'malformed index';
    }
    return indexes;
};

/**
 * 权限类型的枚举值.
 * @enum {string}
 */
ad.spec.ItemType = {
    UNSPECIFIED: 'unspecified',
    SIMPLE_ITEM: 'simple_item',
    COMPLEX_ITEM: 'complex_item'
};
















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
