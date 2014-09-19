/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * src/ad/impl/weigou/storage.js ~ 2013/05/07 14:29:10
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$
 * @description
 * 稍微封装一下sessionStorage的API
 **/
goog.require('ad.impl.weigou.json');

goog.provide('ad.impl.weigou.storage');


/**
 * 向sessionStorage写入数据
 * @param {string} key 键名.
 * @param {*} value 值.
 */
ad.impl.weigou.storage.set = function(key, value) {
    if (window.sessionStorage) {
        // 浏览器禁用本地存储或空间耗尽后，setItem方法会触发QUOTA_EXCEEDED_ERR
        try {
            window.sessionStorage.setItem(key, ad.impl.weigou.json.stringify(value));
        } catch (ex) { }
    }
};

/**
 * 从sessionStorage读取数据
 * @param {string} key 键名.
 * @return {*} 值.
 */
ad.impl.weigou.storage.get = function(key) {
    if (window.sessionStorage) {
        var value = window.sessionStorage.getItem(key);
        if (value) {
            return ad.impl.weigou.json.parse(/** @type {string} */(value));
        }
        return null;
    }
    return null;
};

/**
 * 从sessionStorage删除数据
 * @param {string} key 键名.
 */
ad.impl.weigou.storage.remove = function(key) {
    if (window.sessionStorage) {
        window.sessionStorage.removeItem(key);
    }
};





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
